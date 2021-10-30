const bookMarkObj = /* GRAPH QL */`
type BookMark {
    email: String!
},

type BookMarks {
    bookmarks: [String!],
    accessToken: TokenObject!
}
`

export default bookMarkObj;
