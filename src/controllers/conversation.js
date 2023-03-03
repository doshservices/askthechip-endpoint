const Conversation = require("../services/Conversations")
const { success, error } = require("../utils/baseController")

module.exports.saveMessages = async (req, res) => {
    try {
    const {conversationId, senderId, text} = req.body
    const message = await new Conversation({conversationId, senderId, text}).saveMessage()
    return success(res, {message})
    } catch (err) {
        error(res, {code: 400, message: err.message})
    }
}

module.exports.saveConversation = async (req, res) => {
    try {
    const {members} = req.body
    const conversation = await new Conversation({members}).saveConversation()
    return success(res, {conversation})
    } catch (err) {
        error(res, {code: 400, message: err.message})
    }
}

module.exports.getMessages = async (req, res) => {
    try {
    const {conversationId} = req.body
    const message = await new Conversation({conversationId}).getMessages()
    return success(res, {message})
    } catch (err) {
        error(res, {code: 400, message: err.message})
    }
}