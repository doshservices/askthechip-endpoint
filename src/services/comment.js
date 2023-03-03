const commentModel = require("../models/commentModel");
const postModel = require("../models/postModel");

class Comment {
  constructor(data) {
    this.data = data;
  }

  async createComment() {
    const { postId, userId, content } = this.data;
    const findPost = await postModel.findOne({ _id: postId });
    if (findPost)
      return await new commentModel({ postId, userId, content }).save();
  }

  async getComment() {
    const { postId } = this.data;
    const comment = await commentModel
      .find({ postId: postId })
      .populate("userId");
    if (comment) return comment;
  }

  async getCommentById() {
    const { commentId } = this.data;
    const comment = await commentModel
      .find({ _id: commentId })
      .populate("userId");
    if (comment) return comment;
  }

  async updateComment() {
    const { commentId, userId, content } = this.data;
    const findComment = await commentModel.findOne({_id: commentId})
   if (findComment.userId === userId) {
    const comment = await commentModel
    .updateOne({ _id: commentId }, {content})
  if (comment) return comment;
   }
  }

  async deleteComment () {
    const { commentId, userId } = this.data;
    const Findercomment = await commentModel
    .findOne({ _id: commentId })
    if ( Findercomment.userId.toString() === userId) {
    const comment = await commentModel
      .deleteOne({ _id: commentId })
    if (comment) return comment;
  }
  }
}

module.exports = Comment;
