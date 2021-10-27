const { createUser, fetchUser, updateUserOnLogin } = require('../services/index')

const register = async (req) => {
  const value = await createUser(req.body)
  return value.msg
}

const login = async (req) => {
  const { status, msg } = await fetchUser(req.body)
  const response = await updateUserOnLogin(status, msg)
  if (response.status === 200) {
    return response.msg
  }
  return response.msg
}

module.exports = {
  register,
  login
}
