require('dotenv').config()

const { errorName } = require('../errors/constants')
const verification = require('../middleware/verify')

const { User } = require('../models/index')
const { updateValidation } = require('../validations/index')

const updateUser = async (email, req, accessToken) => {
  const { error } = updateValidation(req)
  if (error) throw new Error(errorName.VALIDATION_ERROR)

  const value = await verification(accessToken)
  const token = value.token
  if (token === '') {
    const user = await User.findOne({ email })
    if (!user) throw new Error(errorName.USER_NOT_EXISTS)

    await User.updateOne({ email: email }, req)

    return {
      msg: {
        update: req,
        email,
        accessToken: { token: '', expires: 0 }
      }
    }
  } else {
    return {
      msg: {
        req,
        email,
        accessToken: token.accessToken
      }
    }
  }
}

module.exports = updateUser
