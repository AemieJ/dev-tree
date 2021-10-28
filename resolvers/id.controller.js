import service from '../services/index.js'
import urlExist from "url-exist"

export const approveID = async ({ id }) => {
  const status = await urlExist(id);
  return status;
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

export const updateID = async({ email, body, accessToken }) => {
  const req = {
    youtube: {
      list: body.youtubeList ?? null
    }
  }

  const value = await service.updateID(email, req, accessToken)
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
