import dotenv from 'dotenv'

import { errorName } from '../../errors/constants.js'
import middle from '../../middleware/index.js'
import models from '../../models/index.js'
import validation from '../../validations/index.js'
dotenv.config()

const createID = async (email, req, accessToken) => {
  const { error } = validation.treeValidation(req)
  if (error) throw new Error(errorName.VALIDATION_ERROR)

  const value = await middle.verification(accessToken, email)
  const token = value.token
  if (token === '') {
    const checkUserExists = await models.Personal.findOne({ email })
    if (checkUserExists) throw new Error(errorName.ID_ALREADY_EXISTS)

    const personal = new models.Personal({
      email: email,
      youtube: req.youtube
    })

    try {
      await personal.save()
    } catch (err) {
      throw new Error(errorName.SERVER_ERROR)
    }

    return {
      msg: {
        status: 201,
        id: req,
        email,
        accessToken: { token: '', expires: 0 }
      }
    }
  } else {
    return {
      msg: {
        status: 403,
        id: req,
        email,
        accessToken: token.accessToken
      }
    }
  }
}

export default createID
