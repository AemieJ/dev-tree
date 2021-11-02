import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 100
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 256
  },
  gender: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    required: false
  },
  lastLogin: {
    type: Number,
    default: 0,
    required: false
  },
  isFirstTimeLogin: {
    type: Boolean,
    default: false, 
    required: false
  },
  bookmarks: {
    type: [String], 
    default: [],
    required: false
  },
  refreshToken: {
    type: String,
    required: false,
    min: 6
  }
})

export default mongoose.model('User', userSchema);
