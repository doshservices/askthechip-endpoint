const postRouter = require('../core/routerConfig')
const Post = require('../controllers/postController')
const { authenticate } = require("../core/userAuth");

postRouter.route('/create-post').post(authenticate,Post.createPost)

postRouter.route('/post').get(authenticate,Post.getAllPost)


module.exports = postRouter