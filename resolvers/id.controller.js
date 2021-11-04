import service from '../services/index.js'
import urlExist from 'url-exist'

export const approveID = async ({ id }) => {
  const status = await urlExist(id)
  return status
}

export const registerID = async ({ email, body, accessToken }) => {
  const req = {
    youtube: {
      id: body.youtubeID ?? '',
      list: body.youtubeList ?? []
    }
  }

  const value = await service.createID(email, req, accessToken)
  return value.msg
}

export const fetchPersonalID = async ({ email }) => {
  const value = await service.fetchID(email)
  return value.msg
}

export const updatePersonalDetails = async ({ email, body, accessToken }) => {
  const req = {
    youtube: {
      list: body.youtubeList ?? null
    }
  }

  const value = await service.updateID(email, req, accessToken)
  return value.msg
}

const returnBody = (acc, req) => {
  if (acc === 'youtube') {
    return {
      youtube: {
        id: req.id,
        list: req.list ?? []
      }
    }
  }
}

export const insertID = async ({ email, body, accessToken }) => {
  const acc = body.account
  const req = returnBody(acc, body)

  const value = await service.reCreateID(email, req, accessToken, acc)
  return value.msg
}

export const deleteID = async ({ email, acc, accessToken }) => {
  const value = await service.deleteID(email, acc, accessToken)
  return value.msg
}

/*

Users => name, email, password, refreshToken, profile, gender
Personal => [ example:
    youtube: {
        id
        list
    }
]
Miscellaneous
*/
