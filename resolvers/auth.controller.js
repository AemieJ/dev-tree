import service from '../services/index.js';

export const register = async (req) => {
  const value = await service.createUser(req.body)
  return value.msg
}

export const login = async (req) => {
  const { status, msg } = await service.fetchUser(req.body)
  const response = await service.updateUserOnLogin(status, msg)
  if (response.status === 200) {
    return response.message
  }
  return response.message
}
