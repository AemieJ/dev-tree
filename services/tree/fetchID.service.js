require('dotenv').config()

const { errorName } = require('../../errors/constants')

const { Personal } = require('../../models/index')

const fetchID = async (email) => {
  const personal = await Personal.findOne({ email })
  if (!personal) throw new Error(errorName.ID_NOT_EXIST)

  const yt = personal.youtube
  const req = {
    youtube: yt
  }

  return {
    msg: {
      id: req,
      email
    }
  }
}

module.exports = fetchID
