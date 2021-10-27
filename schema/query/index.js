const userQuery = require('./user')
const greeterQuery = require('./greeter')

const query = `
type Query {
    ${userQuery}
    ${greeterQuery}
},
`

module.exports = query
