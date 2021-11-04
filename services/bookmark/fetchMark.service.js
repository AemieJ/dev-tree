import dotenv from 'dotenv'

import { errorName } from '../../errors/constants.js'
import models from '../../models/index.js'
import middle from '../../middleware/index.js'
dotenv.config()

const fetchBookmarks = async (email, accessToken) => {
  const value = await middle.verification(accessToken, email)
  const token = value.token

  if (token === '') {
    const user = await models.User.findOne({ email })
    if (!user) throw new Error(errorName.USER_NOT_EXISTS)

    return {
      msg: {
        status: 200,
        bookmarks: user.bookmarks,
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

export default fetchBookmarks
