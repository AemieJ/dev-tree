require('dotenv').config()

const bcrypt = require('bcrypt')
const { errorName } = require('../errors/constants')

const { User } = require('../models/index')

const resetPass = async (email, pass, rePass) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error(errorName.USER_NOT_EXISTS)

  if (pass !== rePass) throw new Error(errorName.UNMATCHING_PASS)
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(pass, salt)

  await User.updateOne({ email: email }, { password: hashedPassword })
  return {
    status: 200,
    message: 'Login with your new credentials'
  }
}

module.exports = resetPass
