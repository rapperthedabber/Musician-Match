const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { Profile, ChatMessage, ChatRoom } = require('../models');
const { signToken } = require('../utils/auth');
const { buildResolveInfo } = require('graphql/execution/execute');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    chatMessages: async () => {
      return ChatMessage.find();
    },
    chatMessage: async (parent, { chatMessageId }) => {
      return ChatMessage.findOne({ _id: chatMessageId });
    },
    chatMessagesByChatRoomId: async (parent, { chatRoomId }) => {
      return ChatMessage.find({ chatRoomId: chatRoomId }).sort([['createdAt', 1]]);
    },
    chatRooms: async () => {
      return ChatRoom.find();
    },
    chatRoom: async (parent, { chatRoomId }) => {
      return ChatRoom.findOne({ _id: chatRoomId });
    },
    chatRoomsByProfileId: async (parent, { profileId }) => {
      const chatRooms = await ChatRoom.find({
        $or: [
          { initiatorId: profileId },
          { receiverId: profileId }
        ]
      }).sort([['updatedAt', -1]]);

      return chatRooms;
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },

    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    likeProfile: async (parent, { profileId, likedProfileId }, context) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { likedProfiles: likedProfileId }
        },
        {
          new: true,
          runValidators: true,
        }
      )
    },
    
    addSwipe: async (parent, { profileId, swipedProfileId }, context) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { $addToSet: { swipedProfiles: swipedProfileId }},
        {
          new: true,
          runValidators: true,
        }
      )
    },

    match: async (parent, { profileId, matchedProfileId }, context) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { $addToSet: { matches: matchedProfileId } },
        {
          new: true,
          runValidators: true,
        }
      )
    },


    addAbout: async (parent, { profileId, instrument, age, url, bio }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      // if (context.user) {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { instrument: instrument },
          $set: { age: age, url: url, bio: bio },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      // }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      // throw new AuthenticationError('You need to be logged in!');
    },

    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    createChatMessage: async (parent, { chatRoomId, senderId, message }, context) => {
      if (context.user) {
        let existingChatRoom = await ChatRoom.findOne({ _id: chatRoomId });
        if (!existingChatRoom) {
          throw new UserInputError('The Chat Room does not exist');
        }
        // Going to assume all chat rooms are two people only
        if (existingChatRoom.initiatorId != senderId && existingChatRoom.receiverId != senderId) {
          throw new AuthenticationError('You are attempting to message to a chat room you are not apart of!');
        }

        let sender = await Profile.findOne({ _id: senderId });
        if (!sender) {
          throw new UserInputError('The sender User Id does not exist');
        }

        let chatMessage = await ChatMessage.create({ chatRoomId, senderId, message });
        return chatMessage;

      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteChatMessage: async (parent, { chatMessageId }, context) => {
      if (context.user) {
        let chatMessage = await ChatMessage.findOne({ _id: chatMessageId });
        if (chatMessage.senderId != context.user._id) {
          throw new AuthenticationError('You are attempting to  delete a message that is not yours!');
        }

        let removedMessage = await ChatMessage.findOneAndRemove({ _id: chatMessageId });
        if (!removedMessage) {
          throw new UserInputError('No Chat Message with this Id exists');
        }

        return removedMessage;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    createChatRoom: async (parent, { initiatorId, receiverId, lastMessage }, context) => {
      if (context.user) {
        let initiator = await Profile.findOne({ _id: initiatorId });
        if (!initiator) {
          throw new UserInputError('The sending User Id does not exist');
        }

        let receiver = await Profile.findOne({ _id: receiverId });
        if (!receiver) {
          throw new UserInputError('The receving User Id does not exist');
        }

        if (initiatorId === receiverId) {
          throw new UserInputError('Can not create a chat room with yourself');
        }

        let existingChatRoom = await ChatRoom.findOne({
          $or: [
            {
              $and: [
                { initiatorId: initiatorId },
                { receiverId: receiverId }
              ]
            },
            {
              $and: [
                { initiatorId: receiverId },
                { receiverId: initiatorId }
              ]
            }
          ]
        })
        if (existingChatRoom) {
          throw new UserInputError('This Chat Room already exists');
        }

        let chatRoom = await ChatRoom.create({ initiatorId, receiverId, lastMessage });
        return chatRoom;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateChatRoom: async (parent, { chatRoomId, lastMessage }, context) => {
      if (context.user) {
        let chatRoom = await ChatRoom.findOneAndUpdate(
          { _id: chatRoomId },
          { $set: { lastMessage: lastMessage } },
          { runValidators: true, new: true }
        );

        if (!chatRoom) {
          throw new UserInputError('No Chat Room with this Id exists');
        }
        return chatRoom;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteChatRoom: async (parent, { chatRoomId }, context) => {
      if (context.user) {
        const chatRoom = await ChatRoom.findOneAndRemove({ _id: chatRoomId });
        if (!chatRoom) {
          throw new UserInputError('No Chat Room with this Id exists');
        }

        return chatRoom;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
