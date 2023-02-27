const {Schema, default: mongoose, model} = require('mongoose')
const { BOARD_TYPE } = require('../utils/constants')

const postSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String,
        required: true
    },
    board: {
        type: String,
        enum: Object.keys(BOARD_TYPE)
    },
    postImg: {
        type: String,
    },
    upVotes: {
        type: String,
    },
    comments: {
        type: Array
    }   
})

const postModel = model('post', postSchema)
module.exports = postModel