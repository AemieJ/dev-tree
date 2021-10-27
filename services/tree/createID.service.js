require('dotenv').config()

const { errorName } = require('../../errors/constants')
const { verification } = require('../../middleware/index')

const { Personal, User } = require('../../models/index')
const { treeValidation } = require('../../validations/index')

const createID = async (email, req, accessToken) => {
  console.log(req)
  const { error } = treeValidation(req)
  if (error) throw new Error(errorName.VALIDATION_ERROR)

  const value = await verification(accessToken)
  const token = value.token
  if (token === '') {
    console.log(email)
    const checkUserExists = await Personal.findOne({ email })
    if (checkUserExists) throw new Error(errorName.ID_ALREADY_EXISTS)

    const personal = new Personal({
      email: email,
      youtube: req.youtube
    })

    try {
        await personal.save();
    } catch (err) {
        throw new Error(errorName.SERVER_ERROR)
    }

    return {
      msg: {
        id: req,
        email,
        accessToken: { token: '', expires: 0 }
      }
    }
  } else {
    return {
      msg: {
        id: req,
        email,
        accessToken: token.accessToken
      }
    }
  }
}

module.exports = createID
