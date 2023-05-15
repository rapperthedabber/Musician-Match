const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    instrument: [String]
    age: Int
    url: String
    likedProfiles: [ID]
    bio: String
    matches: [ID]
    swipedProfiles: [String]
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type ChatMessage {
    _id: ID
    chatRoomId: ID
    senderId: ID
    message: String
  }

  type ChatRoom {
    _id: ID
    initiatorId: ID
    receiverId: ID
    lastMessage: String
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile

    chatMessages: [ChatMessage]
    chatMessage(chatMessageId: ID!): ChatMessage 
    chatMessagesByChatRoomId(chatRoomId: ID!): [ChatMessage]

    chatRooms: [ChatRoom]
    chatRoom(chatRoomId: ID!): ChatRoom
    chatRoomsByProfileId(profileId: ID!): [ChatRoom]
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addAbout(profileId: ID!, instrument: String!, age: Int!, url: String!, bio: String!): Profile
    likeProfile(profileId: ID!, likedProfileId: ID!): Profile
    match(profileId: ID!, matchedProfileId: ID!): Profile
    addSwipe(profileId: ID!, swipedProfileId: ID!): Profile

    removeProfile: Profile

    createChatMessage(chatRoomId: ID!, senderId: ID!, message: String!): ChatMessage
    deleteChatMessage(chatMessageId: ID!): ChatMessage

    createChatRoom(initiatorId: ID!, receiverId: ID!, lastMessage: String!): ChatRoom
    updateChatRoom(chatRoomId: ID!, lastMessage: String!): ChatRoom
    deleteChatRoom(chatRoomId: ID!): ChatRoom
  }
  `;
  
module.exports = typeDefs;
