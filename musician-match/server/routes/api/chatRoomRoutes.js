const router = require('express').Router();

const {
    getChatRooms,
    createChatRoom,
    getChatRoomByChatRoomId,
    updateChatRoom,
    deleteChatRoom,
    getChatRoomsByProfileId
} = require('../../controllers/chatRoomController');

// /api/chatRooms
router.route('/')
    .get(getChatRooms)
    .post(createChatRoom);


// /api/chatRooms/:chatRoomId
router.route('/:chatRoomId')
    .get(getChatRoomByChatRoomId)
    .put(updateChatRoom)
    .delete(deleteChatRoom)

// /api/chatRooms/profile/:profileId
router.route('/profile/:profileId')
    .get(getChatRoomsByProfileId)

module.exports = router;