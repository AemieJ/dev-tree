const userMutation = /* GRAPH QL */`
registerUser(body: RegisterUser!): User!
updateUserInfo(email: String!, body: UpdateUser!, accessToken: String!): UpdateObject!
loginUser(body: LoginUser!): Token!
forgotPass(email: String!): ForgotRes!
resetPass(email: String!, password: String!, rePass: String!): String!`

module.exports = userMutation
