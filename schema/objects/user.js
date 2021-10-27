const userObj = /* GRAPH QL */`
input RegisterUser {
    name: String!
    email: String!
    password: String!
    gender: String!
},

input LoginUser {
    email: String!
    password: String!
},

input UpdateUser {
    name: String
    gender: String
    profile: String
},

type ForgotRes {
    name: String!
    email: String!
    message: String!
},

type TokenObject {
    token: String!
    expires: Int!
},
type ObjectUpdating {
    name: String
    gender: String
    profile: String
}
type UpdateObject {
    update: ObjectUpdating
    email: String
    accessToken: TokenObject
},
type Token {
    accessToken: TokenObject!
    refreshToken: TokenObject!
},

type User {
    name: String!
    email: String!
    gender: String!
    profile: String!
},`

module.exports = userObj
