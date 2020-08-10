const express = require('express');
const {
    graphqlHTTP
} = require('express-graphql');
const {
    buildSchema,
} = require('graphql');

const userSchema = require('./graphql/schema/user');
const messageSchema = require('./graphql/schema/message');
const userRes = require('./graphql/resolvers/user');
const messageRes = require('./graphql/resolvers/message');

// Test chema
const schema = buildSchema(`
  type Query {
    ${userSchema.query}
    ${messageSchema.query}
  }

  ${userSchema.type}
  ${messageSchema.type}

`);

// Test resolvers
// const resolvers = {
//     hello: () => ({
//         name: 'Jojo'
//     }),
//     twitt: () => ({
//         text: 'Good!'
//     }),
// };
const resolvers = {
    ...userRes,
    ...messageRes
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

// Server 
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));