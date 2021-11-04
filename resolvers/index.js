import { register, login } from './auth.controller.js'
import { update, forgotPassword, isValidPassURL, resetPassword, fetch, fetchAll } from './profile.controller.js'
import { registerID, fetchPersonalID, approveID, updatePersonalDetails, insertID, deleteID } from './id.controller.js'
import { getBookmarks, insertBookMark, removeBookMark } from './bookmark.controller.js'

const resolver = {
  user: fetch,
  users: fetchAll,
  registerUser: register,
  loginUser: login,
  updateUserInfo: update,
  forgotPass: forgotPassword,
  isCorrectResetURL: isValidPassURL,
  resetPass: resetPassword,
  insertPersonalID: registerID,
  updatePersonalID: updatePersonalDetails,
  personal: fetchPersonalID,
  isURLValid: approveID,
  addPersonalID: insertID,
  deletePersonalID: deleteID,
  bookmarks: getBookmarks,
  insertBookmark: insertBookMark,
  removeBookmark: removeBookMark,
  greeter: ({ name }) => { return `Hello, ${name}.` }
}

export default resolver
