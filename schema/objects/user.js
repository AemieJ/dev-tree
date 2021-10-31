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
    status: Int!
    name: String!
    email: String!
    message: String!
},

type ResetPassObj {
    status: Int!
    message: String!
}

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
    status: Int!
    update: ObjectUpdating
    email: String
    accessToken: TokenObject
},
type Token {
    accessToken: TokenObject!
    refreshToken: TokenObject!
},

type LoginObj {
    status: Int!
    msg: Token!
}

type User {
    status: Int!
    name: String!
    email: String!
    gender: String!
    profile: String!
},`

export default userObj;
