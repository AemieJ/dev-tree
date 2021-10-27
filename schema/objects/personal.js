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

type FetchPersonal {
    email: String!
    id: Inputs!
}

type Personal {
    email: String!
    id: Inputs!
    accessToken: TokenObject!
},`

export default personalObj;
