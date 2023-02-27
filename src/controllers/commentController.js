const commentRouter = require('../core/routerConfig')
const Comment = require('../services/comment')
const { success, error } = require('../utils/baseController')

module.exports.createComment = async (req,res) => {
   try {
    const postId = req.query.postId
    const userId = req.user.id
    const newComment = await new Comment({postId,userId, ...req.body}).createComment()
   if (newComment) return success(res,{newComment}, 'comment posted successfully')
   return error(res,{code: 400, message: 'post with provided id not found'})
   } catch (err) {
    
   }
}

module.exports.getComment = async (req, res) => {
    try {
        const postId = req.query.postId
        const comment = await new Comment({postId}).getComment()
        return success(res,{comment})
    } catch (err) {
        
    }
}