require('dotenv').config()

const nodemailer = require('nodemailer')
const { errorName } = require('../errors/constants')

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

  const uri = `http://localhost:3000/reset_password?token=${refreshToken}&email=${receiver}` // TODO: Will be changed later on further development of application
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
module.exports = sendMailForPass
