const { Schema, Types, model } = require('mongoose');

const chatMessageSchema = new Schema(
    {
        chatRoomId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
            require: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
            require: true,
        },
        message: {
            type: String,
            require: true,
            minlength: 1,
            maxlength: 500,
        },
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
        timestamps: true,
      }
);

const ChatMessage = model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;