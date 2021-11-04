const personalObj = /* GRAPH QL */`
input RegisterID {
    youtubeID: String
    youtubeList: [String]
},

input InsertID {
    id: String!
    list: [String]
    account: String!
}

input updateID {
    youtubeList: [String]
}

type Obj {
    id: String!
    list: [String]!
},

type Inputs {
    youtube: Obj!
},

type FetchPersonal {
    status: Int!
    email: String!
    id: Inputs!
}

type Personal {
    status: Int!
    email: String!
    id: Inputs!
    accessToken: TokenObject!
},

type DeleteObj {
    message: String!
    status: Int!
    accessToken: TokenObject!
}`

export default personalObj
