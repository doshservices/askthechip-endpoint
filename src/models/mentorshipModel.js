const {Schema, model} = require('mongoose')
const { BOARD_TYPE } = require('../utils/constants')

const mentorshipSchema = new Schema({
    industry: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    others: {
        type: String,
    },  
})

const mentorshipModel = model('post', mentorshipSchema)
module.exports = mentorshipModel