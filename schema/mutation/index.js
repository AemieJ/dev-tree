const userMutation = require('./user')
const personalMutation = require('./personal')

const mutation = `
type Mutation {
    ${userMutation}
    ${personalMutation}
},
`

module.exports = mutation
