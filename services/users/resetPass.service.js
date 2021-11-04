import dotenv from 'dotenv'

import bcrypt from 'bcrypt'
import { errorName } from '../../errors/constants.js'
import models from '../../models/index.js'
dotenv.config()

const resetPass = async (email, pass, rePass) => {
  const user = await models.User.findOne({ email })
  if (!user) throw new Error(errorName.USER_NOT_EXISTS)

  if (pass !== rePass) throw new Error(errorName.UNMATCHING_PASS)
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(pass, salt)

  await models.User.updateOne({ email: email }, { password: hashedPassword })
  return {
    status: 200,
    msg: {
      status: 200,
      message: 'Login with your new credentials'
    }
  }
}

export default resetPass
