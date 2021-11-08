import service from '../services/index.js'

export const insertEmail = async ({ email }) => {
    const value = await service.insertMail(email)
    return value.msg
}