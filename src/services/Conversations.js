const conversationModel = require("../models/conversation");
const messageModel = require("../models/messages");

class Conversation {
  constructor(data) {
    this.data = data;
  }

  async saveMessage() {
    const { conversationId, senderId, text } = this.data;
    return await new messageModel({ conversationId, senderId, text }).save();
  }

  async saveConversation() {
    const {members} = this.data
    return await new conversationModel({members}).save()
  }

 async getMessages() {
    const {conversationId} = this.data
    return await messageModel.find({conversationId}).populate("conversation")
  }

}

module.exports = Conversation