const commentRouter = require('../core/routerConfig')
const Comment = require('../controllers/commentController')
const { authenticate } = require('../core/userAuth')

commentRouter.route('/comment/').post(authenticate, Comment.createComment)
commentRouter.route('/comment/').get(authenticate, Comment.getComment)

module.exports = commentRouter