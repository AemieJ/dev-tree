import dotenv from 'dotenv';
dotenv.config()

import { errorName } from '../../errors/constants.js';
import models from '../../models/index.js';

const fetchDetails = async (email) => {
  const user = await models.User.findOne({ email })
  if (!user) throw new Error(errorName.USER_NOT_EXISTS)

  return {
    msg: {
      status: 200,
      name: user.name,
      email,
      gender: user.gender,
      profile: user.profile
    }
  }
}

export default fetchDetails;
