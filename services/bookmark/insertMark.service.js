import dotenv from 'dotenv'

import { errorName } from '../../errors/constants.js'
import models from '../../models/index.js'
import middle from '../../middleware/index.js'
dotenv.config()

const insertBookmarks = async (userEmail, email, accessToken) => {
  const value = await middle.verification(accessToken, userEmail)
  const token = value.token

  if (token === '') {
    if (userEmail === email) throw new Error(errorName.DUP_EMAIL)
    const user = await models.User.findOne({ email: userEmail })
    if (!user) throw new Error(errorName.USER_NOT_EXISTS)

    const addUser = await models.User.findOne({ email })
    if (!addUser) throw new Error(errorName.USER_NOT_EXISTS)

    let bookmarks = user.bookmarks
    bookmarks = bookmarks.filter(mark => mark !== email)
    bookmarks.push(email)

    try {
      await models.User.updateOne({ email: userEmail }, { bookmarks })
    } catch (err) {
      throw new Error(errorName.SERVER_ERROR)
    }

    return {
      msg: {
        status: 201,
        bookmarks: bookmarks,
        accessToken: { token: '', expires: 0 }
      }
    }
  } else {
    return {
      msg: {
        status: 403,
        bookmarks: [],
        accessToken: token.accessToken
      }
    }
  }
}

export default insertBookmarks
