import dotenv from 'dotenv'

import models from '../../models/index.js'
dotenv.config()

const searchUser = async (query, attr, page) => {

  let users, pages;
  
  if (attr === 'name') {
    pages = await models.User.countDocuments({
      name: new RegExp(query, 'i')
    })

    users = await models.User.find({
        name: new RegExp(query, 'i')
    }).limit(6)
    .skip(6 * page)

  } else if (attr === 'email') {
    pages = await models.User.countDocuments({
      email: new RegExp(query, 'i')
  })

    users = await models.User.find({
        email: new RegExp(query, 'i')
    }).limit(6)
  .skip(6 * page)
  }

  return {
    msg: {
        status: 200,
        users,
        pages: Math.ceil(pages / 6)
    }
  }
}

export default searchUser
