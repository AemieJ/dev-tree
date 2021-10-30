import dotenv from 'dotenv';
dotenv.config()

import { errorName } from '../../errors/constants.js';
import models from '../../models/index.js';
import middle from '../../middleware/index.js';

const removeBookmarks = async (userEmail, email, accessToken) => {
  const value = await middle.verification(accessToken)
  const token = value.token
  if (token === "") {
    if (userEmail === email) throw new Error(errorName.DUP_EMAIL)
    const user = await models.User.findOne({ email: userEmail })
    if (!user) throw new Error(errorName.USER_NOT_EXISTS)

    const removeUser = await models.User.findOne({ email })
    if (!removeUser) throw new Error(errorName.USER_NOT_EXISTS)

    let bookmarks = user.bookmarks
    bookmarks = bookmarks.filter(mark => mark !== email);

    try {
      await models.User.updateOne({ email: userEmail }, { bookmarks })
    } catch (err) {
      throw new Error(errorName.SERVER_ERROR)
    }

    return {
        msg: {
          bookmarks: bookmarks,
          accessToken: { token: '', expires: 0 }
        }
      }
  } else {
    return {
        msg: {
          bookmarks: [],
          accessToken: token.accessToken
        }
      }
  }
}

export default removeBookmarks;
