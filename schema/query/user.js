const userQuery = /* GRAPH QL */`
user(email: String!): User!
users: Users!
isCorrectResetURL(email: String!, token: String!): Boolean!`

export default userQuery
