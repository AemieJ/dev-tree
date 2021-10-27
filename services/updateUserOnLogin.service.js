const { User } = require('../models/index')
const createToken = require('./createToken.service')

const updateUserOnLogin = async (status, msg) => {
  if (status === 200) {
    const token = createToken(msg)
    const refreshToken = token.refreshToken.token

    try {
      await User.findOneAndUpdate({ email: msg.email }, { refreshToken }, {
        new: true,
        useFindAndModify: false
      })
      return {
        headerName: 'auth-token',
        headerValue: token.accessToken.token,
        status: 200,
        msg: token
      }
    } catch (err) {
      return {
        headerName: '',
        headerValue: '',
        status: 500,
        msg: err
      }
    }
  } else {
    return {
      headerName: '',
      headerValue: '',
      status,
      msg
    }
  }
}

module.exports = updateUserOnLogin
