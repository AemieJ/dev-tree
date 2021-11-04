import dotenv from 'dotenv'

import models from '../../models/index.js'
dotenv.config()

const fetchAll = async () => {
  const users = await models.User.find()

  return {
    msg: {
      status: 200,
      users
    }
  }
}

export default fetchAll
