// const userSchema = require("./user");
import query from './query/index.js'
import mutation from './mutation/index.js'
import object from './objects/index.js'

import { buildSchema } from 'graphql'

const schemaStr = `${object}
${query}
${mutation}`
const schema = buildSchema(schemaStr)

export default schema
