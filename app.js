'use strict';
const express = require('express');
const {
    ApolloServer
} = require('apollo-server-express');
const cors = require('cors')

const typeDefs = require('./graphql/typeDefs/index');
const resolvers = require('./graphql/resolvers/index');

const getMe = require('./helpers/getMe');


const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({
        req,
        res
    }) => ({
        me: getMe(req),
        res
    }),
    playground: {
        settings: {
            'request.credentials': 'include',
        },
    },
});

const app = express();
server.applyMiddleware({
    app,
});

app.use(cors({
    credentials: true,
    origin: "http://localhost:4000/graphql"
}))

app.listen({
        port: 4000
    }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);