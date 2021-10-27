const personalObj = /* GRAPH QL */`
input RegisterID {
    youtubeID: String
    youtubeList: [String]
},

type Obj {
    id: String!
    list: [String]!
},

type Inputs {
    youtube: Obj!
},

type Personal {
    email: String!
    id: Inputs!
    accessToken: TokenObject!
},`

module.exports = personalObj