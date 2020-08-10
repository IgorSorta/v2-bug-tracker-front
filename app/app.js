const express = require('express');
const {
    graphqlHTTP
} = require('express-graphql');

const schema = require('./graphql/schema') // Import schema
const resolvers = require('./graphql/resolvers'); // Import resolvers

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true, // for test purposes
}));

// Server 
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));