
const commentModel = require("../models/commentModel");
const postModel = require("../models/postModel");
const userSchema = require("../models/userModel");

class Post {
  constructor(data) {
    this.data = data;
  }

  // create post
  async createPost() {
    const { userId, postImg, board, content } = this.data;
    const data = {
      userId,
      board,
      content,
      postImg,
    };
    return await new postModel(data).save();
  }

  // get all post
  async getPost() {
    return await postModel.find().populate("userId");
  }

  // get a post by Id
  async getPostById() {
    const { postId } = this.data;
    return await postModel.findOne({ _id: postId }).populate("userId");
  }

  // get a user post
  async getUserPost() {
    const { userId } = this.data;
    return await postModel.findOne({ userId: userId });
  }

  // update post
  async updatePost() {
    const { postId, userId, content } = this.data;
    const post = await postModel.findOne({ _id: postId }).populate("userId");
    console.log(content);
    if (post.userId._id.toString() === userId) {
        console.log(content);
      return await postModel.updateOne({ _id: postId }, {content});
    }
  }

  // delete post
  async deletePost() {
    const { postId, userId } = this.data;
    const post = await postModel.findOne({ _id: postId }).populate("userId");
    if (post.userId._id.toString() === userId) {
      return await postModel.deleteOne({ _id: postId });
    }
  }
}

module.exports = Post;
