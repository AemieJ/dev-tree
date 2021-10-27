const { createID, fetchID } = require('../services/index')

const registerID = async ({ email, body, accessToken }) => {
  const req = {
    youtube: {
      id: body.youtubeID ?? '',
      list: body.youtubeList ?? []
    }
  }

  const value = await createID(email, req, accessToken)
  return value.msg
}

const fetchPersonalID = async ({ email }) => {
  const value = await fetchID(email)
  return value.msg
}

// const updateUserID = async ({ email, body, accessToken }) => {

// }

// const deleteUserID = async ({ email, body, accessToken }) => {

// }

module.exports = {
  registerID,
  fetchPersonalID
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
