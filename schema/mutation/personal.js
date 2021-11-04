const personalMutation = /* GRAPH QL */`
insertPersonalID(email: String!, body: RegisterID!, accessToken: String!): Personal!
updatePersonalID(email: String!, body: updateID!, accessToken: String!): Personal!
addPersonalID(email: String!, body: InsertID!, accessToken: String!): Personal!
deletePersonalID(email: String!, acc: String!, accessToken: String!): DeleteObj!`

export default personalMutation
