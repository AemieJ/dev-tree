const bookMarkMutation = /* GRAPH QL */`
insertBookmark(userEmail: String!, email: String!, accessToken: String!): BookMarks!,
removeBookmark(userEmail: String!, email: String!, accessToken: String!): BookMarks!`

export default bookMarkMutation
