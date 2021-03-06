import dotenv from 'dotenv'

import nodemailer from 'nodemailer'
import { errorName } from '../errors/constants.js'
dotenv.config()

const sendMailForPass = async (receiver, refreshToken) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  })

  const uri = `https://dev-tree-client.vercel.app/reset_password/${refreshToken}/${receiver}` // TODO: Will be changed later on further development of application
  const message = {
    from: 'bginger436@gmail.com',
    to: receiver,
    subject: 'Forgot Password | ReAuthenticate',
    text: `You will be using this token for resetting your password: ${uri}. You've only three days.`,
    html: `You will be using this token for resetting your password: <a href='${uri}'>${uri}</a>. You've only three days.`
  }

  try {
    await transporter.sendMail(message)
    return { status: 200, msg: 'Mail sent' }
  } catch (err) {
    throw new Error(errorName.MAIL_ERROR)
  }
}

// sendMailForPass("aemie.j@gmail.com", "agegewge");
export default sendMailForPass
