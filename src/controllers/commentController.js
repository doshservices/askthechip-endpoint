const commentRouter = require("../core/routerConfig");
const Comment = require("../services/comment");
const { success, error } = require("../utils/baseController");

module.exports.createComment = async (req, res) => {
  try {
    const postId = req.query.postId;
    const userId = req.user.id;
    const newComment = await new Comment({
      postId,
      userId,
      ...req.body,
    }).createComment();
    if (newComment)
      return success(res, { newComment }, "comment posted successfully");
    return error(res, {
      code: 400,
      message: "post with provided id not found",
    });
  } catch (err) {
    logger.error("Error occurred at createComment", err);
    return error(res, { code: err.code, message: err.message });
    
  }
};

module.exports.getComment = async (req, res) => {
  try {
    const postId = req.query.postId;
    const comment = await new Comment({ postId }).getComment();
    return success(res, { comment });
  } catch (err) {
    logger.error("Error occurred at getComment", err);
    return error(res, { code: err.code, message: err.message });
}
};

module.exports.updateComment = async (req, res) => {
  try {
    const commentId = req.query.commentId;
    const userId = req.user.id;
    const content = req.body.content;
    const comment = await new Comment({
      commentId,
      userId,
      content,
    }).updateComment();
   if (comment) return success(res, { comment });
    return error(res, { code: 400, message: "you can not edit this comment" });
  } catch (err) {
    logger.error("Error occurred at updateComment", err);
    return error(res, { code: err.code, message: err.message });
}
};

module.exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.query.commentId;
    const userId = req.user.id;
    const comment = await new Comment({ commentId, userId }).deleteComment();
   if (comment) return success(res, { comment });
    return error(res, { code: 400, message: "you can not delete this comment" });
  } catch (err) {
    logger.error("Error occurred at resetPassword", err);
    return error(res, { code: err.code, message: err.message });
}
};
