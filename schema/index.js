// const userSchema = require("./user");
const query = require('./query/index')
const mutation = require('./mutation/index')
const object = require('./objects/index')

const schemaStr = `${object}
${query}
${mutation}`

const { buildSchema } = require('graphql')
const schema = buildSchema(schemaStr)
module.exports = {
  schema
}
