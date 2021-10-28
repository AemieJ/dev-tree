const personalMutation = /* GRAPH QL */`
insertPersonalID(email: String!, body: RegisterID!, accessToken: String!): Personal!
updatePersonalID(email: String!, body: updateID!, accessToken: String!): Personal!`

export default personalMutation;
