import dotenv from 'dotenv';
dotenv.config()

import { errorName } from '../../errors/constants.js';
import verification from '../../middleware/verify.js';
import models from '../../models/index.js';
import validation from '../../validations/index.js';

const updateUser = async (email, req, accessToken) => {
  const { error } = validation.updateValidation(req)
  if (error) throw new Error(errorName.VALIDATION_ERROR)

  const value = await verification(accessToken, email)
  const token = value.token
  if (token === '') {
    const user = await models.User.findOne({ email })
    if (!user) throw new Error(errorName.USER_NOT_EXISTS)

    await models.User.updateOne({ email: email }, req)

    return {
      msg: {
        status: 201,
        update: req,
        email,
        accessToken: { token: '', expires: 0 }
      }
    }
  } else {
    return {
      msg: {
        status: 403,
        update: req,
        email,
        accessToken: token.accessToken
      }
    }
  }
}

export default updateUser;
