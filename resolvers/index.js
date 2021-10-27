const { register, login } = require('./auth.controller')
const { update, forgotPassword, isValidPassURL, resetPassword, fetch } = require('./profile.controller')
const { registerID, fetchPersonalID } = require('./id.controller')

const resolver = {
  user: fetch,
  registerUser: register,
  loginUser: login,
  updateUserInfo: update,
  forgotPass: forgotPassword,
  isCorrectResetURL: isValidPassURL,
  resetPass: resetPassword,
  insertPersonalID: registerID,
  personal: fetchPersonalID,
  greeter: ({ name }) => { return `Hello, ${name}.` }
}

module.exports = resolver
