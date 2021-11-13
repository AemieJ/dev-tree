import { ApolloServer, gql } from 'apollo-server'
import resolver from './resolvers/index.js'
import schemaStr from './schema/index.js'

const typeDefs = gql`
  ${schemaStr}
`;

const resolvers = {
    Query: {
        bookmarks: resolver.bookmarks,
        personal: resolver.personal,
        isURLValid: resolver.isURLValid,
        user: resolver.user,
        users: resolver.users,
        totalUsers: resolver.totalUsers,
        searchUser: resolver.searchUser,
        isCorrectResetURL: resolver.isCorrectResetURL,
        greeter: ({ name }) => { return `Hello, ${name}.` },
    }, 
    Mutation: {
        insertBookmark: resolver.insertBookmark,
        removeBookmark: resolver.removeBookmark,
        insertPersonalID: resolver.insertPersonalID,
        updatePersonalID: resolver.updatePersonalID,
        addPersonalID: resolver.addPersonalID,
        deletePersonalID: resolver.deletePersonalID,
        insertSubscriber: resolver.insertSubscriber,
        registerUser: resolver.registerUser,
        updateUserInfo: resolver.updateUserInfo,
        loginUser: resolver.loginUser,
        forgotPass: resolver.forgotPass,
        resetPass: resolver.resetPass,
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`
        🚀  Server is ready at ${url}
    `);
});