const {
    gql
} = require('apollo-server-express');

module.exports = gql `
type Query {
  userName: User!
  micro: String!
}

type User {
  name: String!
}
`;