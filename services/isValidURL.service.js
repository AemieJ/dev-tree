require('dotenv').config()

const { errorName } = require('../errors/constants')

const { User } = require('../models/index')

const isValidURL = async (email, token) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error(errorName.USER_NOT_EXISTS)

  if (user.refreshToken === token) return true
  return false
}

module.exports = isValidURL
