import userMutation from './user.js';
import personalMutation from './personal.js';

const mutation = `
type Mutation {
    ${userMutation}
    ${personalMutation}
},
`

export default mutation;
