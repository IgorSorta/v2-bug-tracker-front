const {
    buildSchema,
} = require('graphql');

const userSchema = require('./user');
const messageSchema = require('./message');

// Test chema
module.exports = buildSchema(`
  type Query {
    ${userSchema.query}
    ${messageSchema.query}
  }

  ${userSchema.type}
  ${messageSchema.type}

`);