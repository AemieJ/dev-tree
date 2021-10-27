import dotenv from 'dotenv';
dotenv.config()

import bcrypt from 'bcrypt';
import { errorName } from '../../errors/constants.js';
import models from '../../models/index.js';
import validation from '../../validations/index.js';

const fetchUser = async (req) => {
  const { email, password } = req

  const { error } = validation.loginValidation(req)

  if (error) throw new Error(errorName.VALIDATION_ERROR)

  const user = await models.User.findOne({ email })
  if (!user) throw new Error(errorName.USER_NOT_EXISTS)

  const checkPass = await bcrypt.compare(password, user.password)
  if (!checkPass) throw new Error(errorName.USER_INCORRECT_PASS)

  return {
    status: 200,
    msg: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  }
}

export default fetchUser;
