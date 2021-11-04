const bookMarkObj = /* GRAPH QL */`
type BookMark {
    email: String!
},

type BookMarks {
    status: Int!
    bookmarks: [String!]
    accessToken: TokenObject!
}
`

export default bookMarkObj
