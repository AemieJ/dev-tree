require('dotenv').config()

const bcrypt = require('bcrypt')
const { errorName } = require('../errors/constants')

const { User } = require('../models/index')
const { loginValidation } = require('../validations/index')

const fetchUser = async (req) => {
  const { email, password } = req

  const { error } = loginValidation(req)

  if (error) throw new Error(errorName.VALIDATION_ERROR)

  const user = await User.findOne({ email })
  if (!user) throw new Error(errorName.USER_NOT_EXISTS)

  const checkPass = await bcrypt.compare(password, user.password)
  if (!checkPass) throw new Error(errorName.USER_INCORRECT_PASS)

  return {
    status: 200,
    msg: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  }
}

module.exports = fetchUser
