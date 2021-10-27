import userQuery from './user.js';
import personalQuery from './personal.js';
import greeterQuery from './greeter.js';

const query = `
type Query {
    ${userQuery}
    ${personalQuery}
    ${greeterQuery}
},
`

export default query;
