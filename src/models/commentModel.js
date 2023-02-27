const {Schema, default: mongoose, model} = require('mongoose')

const commentSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }, 
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'post'
    },
    content: {
        type: String,
        required: true
    },
    upVotes: {
        type: String,
    }   
})

const commentModel = model('comment', commentSchema)
module.exports = commentModel