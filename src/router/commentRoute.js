const commentRouter = require("../core/routerConfig");
const Comment = require("../controllers/commentController");
const { authenticate } = require("../core/userAuth");

commentRouter
  .route("/comment/")
  .post(authenticate, Comment.createComment)
  .get(authenticate, Comment.getComment)
  .patch(authenticate, Comment.updateComment)
  .delete(authenticate, Comment.deleteComment)

module.exports = commentRouter;
