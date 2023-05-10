const router = require('express').Router();

const {
    getChatRooms,
    createChatRoom
} = require('../../controllers/chatRoomController');

// /api/chatRooms
router.route('/')
    .get(getChatRooms)
    .post(createChatRoom);


// /api/chatRooms/:chatRoomId

// /api/chatRooms/:profileId
