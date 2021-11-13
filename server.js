import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { graphqlHTTP as expressGraphQL } from 'express-graphql'
import playground from 'graphql-playground-middleware-express'
import schemaStr from './schema/index.js'
import getErrorCode from './errors/getCode.js'
import { buildSchema } from 'graphql'

// const { register, login, update, forgotPassword, isValidPassURL,
// resetPassword, registerID } = require("./resolvers/index")
import resolver from './resolvers/index.js'

const app = express()
dotenv.config()

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('Connected to mongodb'))

const root = resolver
const schema = buildSchema(schemaStr)

app.use('/graphql', expressGraphQL({
  schema: schema,
  rootValue: root,
  customFormatErrorFn: (err) => ({
    message: getErrorCode(err.message)
  })
}))

export default app
