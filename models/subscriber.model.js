import mongoose from 'mongoose'

const subscriberSchema = new mongoose.Schema({
  email: {
      type: String,
      default: '',
      required: false
  }
})

export default mongoose.model('Subscriber', subscriberSchema)
