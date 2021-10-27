const userQuery = /* GRAPH QL */`
user(email: String!): User!
isCorrectResetURL(email: String!, token: String!): Boolean!`

export default userQuery;
