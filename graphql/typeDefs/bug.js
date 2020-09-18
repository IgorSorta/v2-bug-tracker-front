const {
    gql
} = require('apollo-server-express');

// *Bug schema definition
const bug = gql `
extend type Query {
  bugs: [Bug!]
  bug(bug_id: ID!): Bug
}
extend type Mutation {
  createBug(title: String! description: String!): Bug!
  deleteBug(bug_id: ID!): Boolean!
  changeStatus(bug_id: ID! status: bugStatus!): String!
  setPriority(bug_id: ID! priority:bugPriority!): String!
}
type Bug {
  bug_id: ID!
  user: User!
  title: String!
  description: String!
  status: String!
  priority: String!
  createdAt: Date!
}
enum bugStatus {
  NEW
  CONFIRMED
  DEVELOPED
  IN TESTING
  TESTED
  CLOSED
  REJECTED
}
enum bugPriority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
`;

module.exports = bug;