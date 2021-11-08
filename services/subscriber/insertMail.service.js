import dotenv from 'dotenv'

import { errorName } from '../../errors/constants.js'
import models from '../../models/index.js'
dotenv.config()

const insertMail = async(email) => {
    const checkUser = await models.Subscriber.findOne({ email })
    if (checkUser) throw new Error(errorName.USER_ALREADY_EXISTS)

    const user = new models.Subscriber({
        email
    })

    try {
        await user.save()
        return {
            msg: {
                status: 201
            }
        }
    } catch (err) {
        throw new Error(errorName.SERVER_ERROR)
    }
}

export default insertMail