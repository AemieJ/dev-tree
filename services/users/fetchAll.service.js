import dotenv from 'dotenv'

import models from '../../models/index.js'
dotenv.config()

const fetchAll = async (page) => {

  const users = await models.User.find()
  .limit(6)
  .skip(6 * page)

  return {
    msg: {
      status: 200,
      users
    }
  }
}

export default fetchAll
