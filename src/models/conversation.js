const {Schema, default: mongoose, model} = require('mongoose')

const conversationSchema = new Schema({
    members: {
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    } 
})

const conversationModel = model('conversation', conversationSchema)
module.exports = conversationModel