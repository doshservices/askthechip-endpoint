const {Schema, model, default: mongoose} = require('mongoose')

const messageSchema = new Schema({
    conversationId: {
        type: mongoose.Types.ObjectId,
        ref: 'conversation'
    },
    senderId:  {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    text:  {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {timestamps: true})

const messageModel = model('message', messageSchema)
module.exports = messageModel