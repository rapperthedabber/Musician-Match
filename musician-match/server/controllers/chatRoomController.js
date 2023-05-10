const { ChatRoom, Profile } = require('../models'); 

module.exports = {
    async createChatRoom(req, res, next) {
        try {      
            const initiator = await Profile.findOne({ _id: req.body.initiatorId });
            if (!initiator) {
                const error = new Error('The sending User Id does not exist');
                error.statusCode = 404;
                throw error
            }

            const receiver = await Profile.findOne({ _id: req.body.receiverId });
            if (!receiver) {
                const error = new Error('The receving User Id does not exist');
                error.statusCode = 404;
                throw error
            }

            if (req.body.initiatorId === req.body.receiverId) {
                const error = new Error('Can not create a chat room with yourself');
                error.statusCode = 404;
                throw error
            }

            const existingChatRoom = await ChatRoom.findOne({
                $or: [
                    {$and: [
                        { initiatorId: req.body.initiatorId },
                        { receiverId:  req.body.receiverId }
                    ]},
                    {$and: [
                        { initiatorId: req.body.receiverId },
                        { receiverId:  req.body.initiatorId }
                    ]}
                ]
            })
            if (existingChatRoom) {
                const error = new Error('This Chat Room already exists');
                error.statusCode = 404;
                throw error
            }

            const chatRoom = await ChatRoom.create(req.body);
            chatRoom.save();
      
            res.json(chatRoom);
          } catch (err) {
            console.log(err);
            next(err);
          }
    },
    async getChatRooms(req, res, next) {
        try {
            const chatRooms = await ChatRoom.find();

            res.json(chatRooms);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getChatRoomByChatRoomId(req, res) {
        try {
            const chatRooms = await ChatRoom.findOne({ _id: req.params.chatRoomId });

            res.json(chatRooms);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getChatRoomsByProfileId(req, res, next) {
        try {
            const chatRooms = await ChatRoom.find({ 
                $or: [
                    { initiatorId: req.params.profileId },
                    { receiverId:  req.params.profileId }
                ]
            }).sort([['updatedAt', -1]]);

            res.json(chatRooms);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateChatRoom(req, res, next) {
        try {
            const chatRoom = await ChatRoom.findOneAndUpdate(
              { _id: req.params.chatRoomId },
              { $set: req.body },
              { runValidators: true, new: true }
            );
      
            if (!chatRoom) {
                throw new Error('No Chat Room with this id!');
            }
      
            res.json(chatRoom);
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
    },
    async deleteChatRoom(req, res, next) {
        try {
            const chatRoom = await ChatRoom.findOneAndRemove({ _id: req.params.chatRoomId });
    
            if (!chatRoom) {
                throw new Error('No Chat Room with this id!');
            }
    
            res.json({ message: 'Chat Room successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}