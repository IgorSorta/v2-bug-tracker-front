const express = require('express');
const {
    ApolloServer
} = require('apollo-server-express');

const {
    typeDefs,
    resolvers
} = require('./graphql');

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: {
        ctx: 'testUser'
    }
});

const app = express();
server.applyMiddleware({
    app
});

app.listen({
        port: 4000
    }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);