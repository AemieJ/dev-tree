import dotenv from 'dotenv'

import { errorName } from '../../errors/constants.js'
import models from '../../models/index.js'
dotenv.config()

const fetchID = async (email) => {
  const personal = await models.Personal.findOne({ email })
  if (!personal) throw new Error(errorName.ID_NOT_EXIST)

  const yt = personal.youtube
  const req = {
    youtube: yt
  }

  return {
    msg: {
      status: 200,
      id: req,
      email
    }
  }
}

export default fetchID
