import dotenv from 'dotenv';
dotenv.config()

import { errorName } from '../../errors/constants.js';
import models from '../../models/index.js';
import middle from "../../middleware/index.js";


const fetchBookmarks = async (email, accessToken) => {
  const value = await middle.verification(accessToken)
  const token = value.token
  
  if (token === "") {
    const user = await models.User.findOne({ email })
    if (!user) throw new Error(errorName.USER_NOT_EXISTS)

    return {
        msg: {
          bookmarks: user.bookmarks,
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

export default fetchBookmarks;
