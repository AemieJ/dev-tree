const userQuery = /* GRAPH QL */`
user(email: String!): User!
users(page: Int!): Users!
totalUsers: Int!
searchUser(query: String!, attr: String!, page: Int!): SearchUsers!
isCorrectResetURL(email: String!, token: String!): Boolean!`

export default userQuery
