import dotenv from 'dotenv'

import { errorName } from '../../errors/constants.js'
import models from '../../models/index.js'
dotenv.config()

const isValidURL = async (email, token) => {
  const user = await models.User.findOne({ email })
  if (!user) throw new Error(errorName.USER_NOT_EXISTS)

  if (user.refreshToken === token) return true
  return false
}

export default isValidURL
