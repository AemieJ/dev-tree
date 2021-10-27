import mongoose from 'mongoose';

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

export default mongoose.model('Personal', personalSchema);
