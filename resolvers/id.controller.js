import service from '../services/index.js'

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
