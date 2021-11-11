import { register, login } from './auth.controller.js'
import { update, forgotPassword, isValidPassURL, resetPassword, fetch, fetchAll, totalUsers, searchUser } from './profile.controller.js'
import { registerID, fetchPersonalID, approveID, updatePersonalDetails, insertID, deleteID } from './id.controller.js'
import { getBookmarks, insertBookMark, removeBookMark } from './bookmark.controller.js'
import { insertEmail } from './subscriber.controller.js'

const resolver = {
  user: fetch,
  users: fetchAll,
  searchUser: searchUser,
  registerUser: register,
  loginUser: login,
  updateUserInfo: update,
  forgotPass: forgotPassword,
  isCorrectResetURL: isValidPassURL,
  resetPass: resetPassword,
  insertPersonalID: registerID,
  updatePersonalID: updatePersonalDetails,
  totalUsers: totalUsers,
  personal: fetchPersonalID,
  isURLValid: approveID,
  addPersonalID: insertID,
  deletePersonalID: deleteID,
  bookmarks: getBookmarks,
  insertBookmark: insertBookMark,
  removeBookmark: removeBookMark,
  insertSubscriber: insertEmail,
  greeter: ({ name }) => { return `Hello, ${name}.` }
}

export default resolver
