import dotenv from 'dotenv'

import models from '../../models/index.js'
dotenv.config()

const totalUsers = async () => {

  const pages = await models.User.countDocuments()

  return {
    msg: pages
  }
}

export default totalUsers
