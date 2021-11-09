const userQuery = /* GRAPH QL */`
user(email: String!): User!
users(page: Int!): Users!
totalUsers: Int!
isCorrectResetURL(email: String!, token: String!): Boolean!`

export default userQuery
