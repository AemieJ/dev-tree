import models from '../../models/index.js'
import createToken from './createToken.service.js'

const updateUserOnLogin = async (status, msg) => {
  if (status === 200) {
    const token = createToken(msg)
    const refreshToken = token.refreshToken.token
    const currentDate = new Date()
    const lastLogin = Math.floor(new Date(currentDate.getTime()).getTime() / 1000)
    let isFirstTimeLogin = false

    const user = await models.User.findOne({ email: msg.email })
    if (user.lastLogin === 0) {
      isFirstTimeLogin = true
    }

    try {
      await models.User.findOneAndUpdate({ email: msg.email }, { refreshToken, lastLogin, isFirstTimeLogin }, {
        new: true,
        useFindAndModify: false
      })

      return {
        headerName: 'auth-token',
        headerValue: token.accessToken.token,
        status: 200,
        message: {
          status: 200,
          msg: token
        }
      }
    } catch (err) {
      return {
        headerName: '',
        headerValue: '',
        status: 500,
        message: {
          status: 500,
          msg: err
        }
      }
    }
  } else {
    return {
      headerName: '',
      headerValue: '',
      status,
      message: {
        status,
        msg
      }
    }
  }
}

export default updateUserOnLogin
