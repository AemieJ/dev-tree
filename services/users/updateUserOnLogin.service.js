import models from '../../models/index.js';
import createToken from './createToken.service.js';

const updateUserOnLogin = async (status, msg) => {
  if (status === 200) {
    const token = createToken(msg)
    const refreshToken = token.refreshToken.token
    const currentDate = new Date()
    const lastLogin = Math.floor(new Date(currentDate.getTime()).getTime() / 1000)

    try {
      await models.User.findOneAndUpdate({ email: msg.email }, { refreshToken, lastLogin }, {
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

export default updateUserOnLogin;
