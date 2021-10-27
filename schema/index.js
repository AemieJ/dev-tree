// const userSchema = require("./user");
import query from './query/index.js';
import mutation from './mutation/index.js';
import object from './objects/index.js';

const schemaStr = `${object}
${query}
${mutation}`

import { buildSchema } from 'graphql';
const schema = buildSchema(schemaStr)

export default schema;
