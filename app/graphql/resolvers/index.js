const userResolvers = require('./user');
const messageResolvers = require('./message');

// Gather resolvers and export them
module.exports = {
    ...userResolvers,
    ...messageResolvers
};