import userMutation from './user.js';
import personalMutation from './personal.js';
import bookMarkMutation from './bookmark.js';

const mutation = `
type Mutation {
    ${userMutation}
    ${personalMutation}
    ${bookMarkMutation}
},
`

export default mutation;
