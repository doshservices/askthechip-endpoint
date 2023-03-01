const postRouter = require('../core/routerConfig')
const Post = require('../controllers/postController')
const { authenticate } = require("../core/userAuth");

postRouter.route('/create-post').post(authenticate,Post.createPost)

postRouter.route('/post').get(authenticate,Post.getAllPost)

postRouter.route('/post/delete-post').delete(authenticate,Post.deletePost)

postRouter.route('/post/update-post').patch(authenticate,Post.updatePost)

postRouter.route('/post/:postId').get(authenticate,Post.getPostById)

postRouter.route('/post/get-user-post/:userId').get(authenticate,Post.getUserPost)


module.exports = postRouter