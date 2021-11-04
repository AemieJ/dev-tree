const userMutation = /* GRAPH QL */`
registerUser(body: RegisterUser!): User!
updateUserInfo(email: String!, body: UpdateUser!, accessToken: String!): UpdateObject!
loginUser(body: LoginUser!): LoginObj!
forgotPass(email: String!): ForgotRes!
resetPass(email: String!, password: String!, rePass: String!): ResetPassObj!`

export default userMutation
