require('dotenv').config()

const { errorName } = require('../errors/constants')
const { sendMailForPass } = require('../middleware')

const { User } = require('../models/index')

const forgotPass = async (email) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error(errorName.USER_NOT_EXISTS)

  // send mail with the refresh token
  const { status, msg } = await sendMailForPass(email, user.refreshToken)

  return {
    status: status,
    msg: {
      name: user.name,
      email: user.email,
      message: msg
    }
  }
}

module.exports = forgotPass
