import service from '../services/index.js'

export const fetch = async ({ email }) => {
  const value = await service.fetchDetails(email)
  return value.msg
}

export const fetchAll = async ({ page }) => {
  const value = await service.fetchAll(page)
  return value.msg
}

export const searchUser = async({ query, attr, page }) => {
  const value = await service.searchUser(query, attr, page)
  return value.msg
}

export const totalUsers = async() => {
  const value = await service.totalUsers()
  return value.msg
}

export const update = async ({ email, body, accessToken }) => {
  const value = await service.updateUser(email, body, accessToken)
  return value.msg
}

export const forgotPassword = async ({ email }) => {
  const value = await service.forgotPass(email)
  return value.msg
}

export const isValidPassURL = async ({ email, token }) => {
  const flag = await service.isValidURL(email, token)
  return flag
}

export const resetPassword = async ({ email, password, rePass }) => {
  const value = await service.resetPass(email, password, rePass)
  if (value.status === 200) return value.msg
}
