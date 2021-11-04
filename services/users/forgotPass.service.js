import dotenv from 'dotenv'

import { errorName } from '../../errors/constants.js'
import middle from '../../middleware/index.js'
import models from '../../models/index.js'
dotenv.config()

const forgotPass = async (email) => {
  const user = await models.User.findOne({ email })
  if (!user) throw new Error(errorName.USER_NOT_EXISTS)

  // send mail with the refresh token
  const { status, msg } = await middle.sendMailForPass(email, user.refreshToken)

  return {
    msg: {
      status: status,
      name: user.name,
      email: user.email,
      message: msg
    }
  }
}

export default forgotPass
