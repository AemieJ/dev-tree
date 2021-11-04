import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { errorName } from '../errors/constants.js'
import models from '../models/index.js'
dotenv.config()

const verification = async (accessToken, email) => {
  const currentTimeSinceEpoch = Math.floor(new Date().getTime() / 1000)

  const token = accessToken
  if (token === '' || !token) throw new Error(errorName.INVALID_TOKEN)
  const check = jwt.decode(token)
  if (!check) throw new Error(errorName.INVALID_TOKEN)
  if (check.email !== email) throw new Error(errorName.INVALID_TOKEN)

  const accessTokenExpires = check.exp
  const user = await models.User.findOne({ email: check.email })

  const refreshPayload = jwt.decode(user.refreshToken)
  if (!refreshPayload) throw new Error(errorName.NOT_LOGGED_IN)

  if (currentTimeSinceEpoch > refreshPayload.exp) { throw new Error(errorName.REFRESH_EXPIRED) }

  // refreshing the access token with the help of refresh token
  if (currentTimeSinceEpoch > accessTokenExpires) {
    if (currentTimeSinceEpoch <= refreshPayload.exp) {
      const accessToken = jwt.sign({ _id: check._id, email: check.email }, process.env.TOKEN_SECRET, { expiresIn: '10m' })
      const token = {
        accessToken: {
          token: accessToken,
          expires: Math.floor(new Date(new Date().getTime() + 10 * 60000).getTime() / 1000)
        }
      }
      return { status: 200, token: token, payload: '' }
    } else {
      throw new Error(errorName.REFRESH_EXPIRED)
    }
  } else {
    try {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET)
      return { status: 200, token: '', payload: payload }
    } catch (err) {
      throw new Error(errorName.INVALID_TOKEN)
    }
  }
}

export default verification
