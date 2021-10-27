const { updateUser, forgotPass, isValidURL, resetPass } = require('../services/index')

const update = async ({ email, body, accessToken }) => {
  const value = await updateUser(email, body, accessToken)
  return value.msg
}

const forgotPassword = async ({ email }) => {
  const value = await forgotPass(email)
  return value.msg
}

const isValidPassURL = async ({ email, token }) => {
  const flag = await isValidURL(email, token)
  return flag
}

const resetPassword = async ({ email, password, rePass }) => {
  const value = await resetPass(email, password, rePass)
  if (value.status === 200) return value.message
}

module.exports = {
  update,
  forgotPassword,
  isValidPassURL,
  resetPassword
}
