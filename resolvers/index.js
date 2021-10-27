const { register, login } = require('./auth.controller')
const { update, forgotPassword, isValidPassURL, resetPassword } = require('./profile.controller')
const { registerID } = require('./id.controller')

const resolver = {
  registerUser: register,
  loginUser: login,
  updateUserInfo: update,
  forgotPass: forgotPassword,
  isCorrectResetURL: isValidPassURL,
  resetPass: resetPassword,
  insertPersonalID: registerID,
  greeter: ({ name }) => { return `Hello ${name}` }
}

module.exports = resolver
