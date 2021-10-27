require('dotenv').config()

const { errorName } = require('../../errors/constants')

const { User } = require('../../models/index')

const fetchDetails = async (email) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error(errorName.USER_NOT_EXISTS)

  return {
    msg: {
      name: user.name,
      email,
      gender: user.gender,
      profile: user.profile
    }
  }
}

module.exports = fetchDetails
