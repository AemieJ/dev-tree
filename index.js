import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { graphqlHTTP as expressGraphQL } from 'express-graphql';
import schema from './schema/index.js';
import getErrorCode from './errors/getCode.js';

// const { register, login, update, forgotPassword, isValidPassURL,
// resetPassword, registerID } = require("./resolvers/index")
import resolver from './resolvers/index.js';

const app = express()
const PORT = 4000 || process.env.PORT
dotenv.config()

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('Connected to mongodb'))

const root = resolver

app.use('/graphql', expressGraphQL({
  schema: schema,
  rootValue: root,
  graphiql: true,
  customFormatErrorFn: (err) => ({
    message: getErrorCode(err.message)
  })
}))

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Hey there' })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))