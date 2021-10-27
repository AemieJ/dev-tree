require('dotenv').config()
const jwt = require('jsonwebtoken')

const createToken = (user) => {
  const currentDate = new Date()
  const accessToken = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '10m' })
  const refreshToken = jwt.sign({ _id: user._id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3d' })

  const token = {
    accessToken: {
      token: accessToken,
      expires: Math.floor(new Date(currentDate.getTime() + 10 * 60000).getTime() / 1000)
    },
    refreshToken: {
      token: refreshToken,
      expires: Math.floor(new Date(currentDate.getTime() + 24 * 60 * 3 * 60000).getTime() / 1000)
    }
  }
  return token
}

module.exports = createToken
