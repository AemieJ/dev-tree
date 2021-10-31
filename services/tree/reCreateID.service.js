import dotenv from 'dotenv';
dotenv.config()

import { errorName } from '../../errors/constants.js';
import middle from '../../middleware/index.js';
import models from '../../models/index.js';
import validation from '../../validations/index.js';

const reCreateID = async (email, body, accessToken, acc) => {
  const { error } = validation.insertTreeValidation(body)
  if (error) throw new Error(errorName.VALIDATION_ERROR)

  const value = await middle.verification(accessToken, email)
  const token = value.token
  if (token === '') {
    const checkUserExists = await models.Personal.findOne({ email })
    if (!checkUserExists) throw new Error(errorName.ID_NOT_EXISTS)

    if (acc === 'youtube') {
      if (checkUserExists.youtube.id !== '') throw new Error(errorName.NOT_ACC_DELETE)
    }

    try {
      await models.Personal.updateOne({ email }, body);
    } catch (err) {
      throw new Error(errorName.SERVER_ERROR)
    }

    return {
      msg: {
        status: 200,
        id: body,
        email,
        accessToken: { token: '', expires: 0 }
      }
    }
  } else {
    return {
      msg: {
        status: 403,
        id: body,
        email,
        accessToken: token.accessToken
      }
    }
  }
}

export default reCreateID;
