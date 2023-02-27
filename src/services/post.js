const { post } = require("../core/routerConfig")
const commentModel = require("../models/commentModel")
const postModel = require("../models/postModel")
const userSchema = require("../models/userModel")


class Post {
    constructor(data){
        this.data = data
    }

    // create post
   async createPost () {
        const {userId, postImg, board,content} = this.data
        const data = {
            userId,
            board,
            content,
            postImg,
        }
       return await new postModel(data).save()
    }

    // get all post
    async getPost () {
        return  await postModel.find()
    }

    // get a post by Id
    async getPostById () {
        const {postId} = this.data
        return  await postModel.findOne({_id: postId})
    }

    // get a user post
    async getUserPost () {
        const {userId} = this.data
        return  await postModel.findOne({userId: userId})
    }

    // update post
    async updatePost () {
        const {postId,userId, update} = this.data
        const post =  await postModel.findOne({_id: postId})
        if (post.userId === userId) {
            return await postModel.updateOne({_id: postId}, update)
        }
    }
    
      // delete post
      async deletePost () {
        const {postId,userId} = this.data
        const post =  await postModel.findOne({_id: postId})
        if (post.userId === userId) {
            return await postModel.deleteOne({_id: postId})
        }
    }

}

module.exports = Post