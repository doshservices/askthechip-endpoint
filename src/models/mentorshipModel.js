const {Schema, model} = require('mongoose')
const { BOOKING_STATUS } = require('../utils/constants')

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
  status: {
    type: String,
    enum: Object.keys(BOOKING_STATUS),
    default: BOOKING_STATUS.PENDING,
    require: true
  },
  uniqueId: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
})

const mentorshipModel = model('mentorship', mentorshipSchema)
module.exports = mentorshipModel