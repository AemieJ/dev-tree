const userQuery = require('./user')
const personalQuery = require('./personal')
const greeterQuery = require('./greeter')

const query = `
type Query {
    ${userQuery}
    ${personalQuery}
    ${greeterQuery}
},
`

module.exports = query
