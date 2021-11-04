import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import toonavatar from 'cartoon-avatar'
import { errorName } from '../../errors/constants.js'
import models from '../../models/index.js'
import validation from '../../validations/index.js'
dotenv.config()

const createUser = async (req) => {
  const { name, email, gender, password } = req
  const { error } = validation.registerValidation(req)
  if (error) throw new Error(errorName.VALIDATION_ERROR)

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const profile = toonavatar.generate_avatar({ gender: gender })

  const user = new models.User({
    name, email, gender, profile, password: hashedPassword
  })

  const checkUserExists = await models.User.findOne({ email })
  if (checkUserExists) throw new Error(errorName.USER_ALREADY_EXISTS)
  try {
    await user.save()
    return {
      msg: {
        status: 201,
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        profile: user.profile
      }
    }
  } catch (err) {
    throw new Error(errorName.SERVER_ERROR)
  }
}

export default createUser
