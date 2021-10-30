import dotenv from 'dotenv';
dotenv.config()

import { errorName } from '../../errors/constants.js';
import models from '../../models/index.js';


const insertBookmarks = async (userEmail, email, accessToken) => {

  const value = await verification(accessToken)
  const token = value.token
  
  if (token === "") {
    const user = await models.User.findOne({ userEmail })
    if (!user) throw new Error(errorName.USER_NOT_EXISTS)

    let bookmarks = user.bookmarks
    bookmarks.add(email)

    await models.User.updateOne({ email }, { bookmarks });

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
          accessToken: token
        }
      }
  }
}

export default insertBookmarks;
