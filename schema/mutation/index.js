import userMutation from './user.js'
import personalMutation from './personal.js'
import bookMarkMutation from './bookmark.js'
import subscriberMutation from './subscriber.js'

const mutation = `
type Mutation {
    ${userMutation}
    ${personalMutation}
    ${bookMarkMutation}
    ${subscriberMutation}
},
`

export default mutation
