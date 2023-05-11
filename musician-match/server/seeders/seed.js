const db = require('../config/connection');
const { Profile, ChatRoom, ChatMessage } = require('../models');
const profileSeeds = require('./profileSeeds.json');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    await ChatRoom.deleteMany({});
    await ChatMessage.deleteMany({});
    
    // assigned creation to a variable so I can use _ids of profiles for chat functionality - My My
    const profiles = await Profile.create(profileSeeds);

    // creating 3 chat rooms
    let chatRooms = [];
    for (let i = 0; i < 3; i++) {
      chatRooms.push({
        initiatorId: profiles[0]._id,
        receiverId: profiles[i + 1]._id,
        lastMessage: `You have a new message ${profiles[i + 1].name}`,
      });
    }

    chatRooms = await ChatRoom.create(chatRooms);
    console.log(chatRooms[0]._id);

    // add 4 messages to the 3 chat rooms
    for (let i = 0; i < 3; i++) {
      const messages = [
        {
          chatRoomId: chatRooms[i]._id,
          senderId: profiles[0]._id,
          message: `Hi ${profiles[i + 1].name}.`,
        },
        {
          chatRoomId: chatRooms[i]._id,
          senderId: profiles[i + 1]._id,
          message: `Hi ${profiles[0].name}.`,
        },
        {
          chatRoomId: chatRooms[i]._id,
          senderId: profiles[0]._id,
          message: `How are you?`,
        },
        {
          chatRoomId: chatRooms[i]._id,
          senderId: profiles[i + 1]._id,
          message: `I'm going good how are you?`,
        },
      ];

      await ChatMessage.insertMany(messages);
    }

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
