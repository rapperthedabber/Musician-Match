const router = require('express').Router();

const {
    getChatMessages,
    createChatMessage,
    getChatMessage,
    deleteChatMessage,
    getChatMessagesByChatRoomId
} = require('../../controllers/chatMessageController');

// /api/chatMessages
router.route('/')
    .get(getChatMessages)
    .post(createChatMessage);


// /api/chatMessages/:chatMessageId
router.route('/:chatMessageId')
    .get(getChatMessage)
    .delete(deleteChatMessage)

// /api/chatMessages/chatRoom/:chatRoomId
router.route('/chatRoom/:chatRoomId')
    .get(getChatMessagesByChatRoomId)

module.exports = router;