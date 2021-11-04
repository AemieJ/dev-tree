import userQuery from './user.js'
import personalQuery from './personal.js'
import bookMarkQuery from './bookmark.js'
import greeterQuery from './greeter.js'

const query = `
type Query {
    ${userQuery}
    ${personalQuery}
    ${bookMarkQuery}
    ${greeterQuery}
},
`

export default query
