const mongoose = require('mongoose')

const personalSchema = new mongoose.Schema({
  email: String,
  youtube: {
    id: {
      type: String,
      default: '',
      required: false
    },
    list: {
      type: [String],
      default: [],
      required: false
    }
  }
})

module.exports = mongoose.model('Personal', personalSchema)
