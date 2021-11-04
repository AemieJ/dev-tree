import dotenv from 'dotenv'

import { errorName } from '../../errors/constants.js'
import middle from '../../middleware/index.js'
import models from '../../models/index.js'
dotenv.config()

const deleteID = async (email, acc, accessToken) => {
  const value = await middle.verification(accessToken, email)
  const token = value.token
  if (token === '') {
    const personal = await models.Personal.findOne({ email })
    if (!personal) throw new Error(errorName.ID_NOT_EXISTS)

    if (acc === 'youtube') {
      if (personal.youtube.id === '') throw new Error(errorName.ID_NOT_EXISTS)
      personal.youtube = undefined
    }

    try {
      await personal.save()
    } catch (err) {
      throw new Error(errorName.SERVER_ERROR)
    }

    return {
      msg: {
        message: 'Deletion has been done',
        status: 200,
        accessToken: { token: '', expires: 0 }
      }
    }
  } else {
    return {
      msg: {
        message: 'Access token expired',
        status: 403,
        accessToken: token.accessToken
      }
    }
  }
}

export default deleteID
