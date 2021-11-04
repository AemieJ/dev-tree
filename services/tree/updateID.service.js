import dotenv from 'dotenv'

import { errorName } from '../../errors/constants.js'
import middle from '../../middleware/index.js'
import models from '../../models/index.js'
import validation from '../../validations/index.js'
dotenv.config()

const updateID = async (email, req, accessToken) => {
  const { error } = validation.updateTreeValidation(req)
  if (error) throw new Error(errorName.VALIDATION_ERROR)
  const value = await middle.verification(accessToken, email)
  const token = value.token
  if (token === '') {
    const checkUserExists = await models.Personal.findOne({ email })
    if (!checkUserExists) throw new Error(errorName.ID_NOT_EXISTS)

    const reqUpdate = {
      youtube: {
        id: checkUserExists.youtube.id,
        list: (req.youtube.list === null ? checkUserExists.youtube.list : req.youtube.list)
      }
    }

    try {
      await models.Personal.updateOne({ email }, { youtube: reqUpdate.youtube })
    } catch (err) {
      throw new Error(errorName.SERVER_ERROR)
    }

    return {
      msg: {
        status: 200,
        id: reqUpdate,
        email,
        accessToken: { token: '', expires: 0 }
      }
    }
  } else {
    const emptyReq = {
      youtube: {
        id: '',
        list: []
      }
    }
    return {
      msg: {
        status: 403,
        id: emptyReq,
        email,
        accessToken: token.accessToken
      }
    }
  }
}

export default updateID
