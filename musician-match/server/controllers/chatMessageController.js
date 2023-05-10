const { ChatMessage, ChatRoom, Profile } = require('../models');

module.exports = {
    // create
    async createChatMessage(req, res, next) {
        try {      
            const existingChatRoom = await ChatRoom.findOne({ _id: req.body.chatRoomId });
            if (!existingChatRoom) {
                const error = new Error('The Chat Room does not exist');
                error.statusCode = 404;
                throw error
            }

            const sender = await Profile.findOne({ _id: req.body.senderId });
            if (!sender) {
                const error = new Error('The sender User Id does not exist');
                error.statusCode = 404;
                throw error
            }

            const chatMessage = await ChatMessage.create(req.body);
            chatMessage.save();
      
            res.json(chatMessage);
          } catch (err) {
            console.log(err);
            next(err);
          }
    },
    // read
    async getChatMessages(req, res, next) {
        try {
            const chatMessages = await ChatMessage.find();

            res.json(chatMessages);
        } catch (err) {
            console.log(err);
            next(err);
        }
    },
    // read single
    async getChatMessage(req, res, next) {
        try {
            const chatMessages = await ChatMessage.findOne({ _id: req.params.chatMessageId });

            res.json(chatMessages);
        } catch (err) {
            console.log(err);
            next(err);
        }
    },
    // read by chat room id
    async getChatMessagesByChatRoomId(req, res, next) {
        try {
            const chatMessages = await ChatMessage.find({ chatRoomId: req.params.chatRoomId }).sort([['createdAt', 1]]);

            res.json(chatMessages);
        } catch (err) {
            console.log(err);
            next(err);
        }
    },
    // delete
    async deleteChatMessage(req, res, next) {
        try {
            const chatMessage = await ChatMessage.findOneAndRemove({ _id: req.params.chatMessageId });
    
            if (!chatMessage) {
                const error = new Error('No Chat Message with this Id exists');
                error.statusCode = 404;
                throw error
            }
    
            res.json({ message: 'Chat Message successfully deleted' });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}