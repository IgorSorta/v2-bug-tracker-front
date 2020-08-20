'use strict';
const axios = require('axios');

module.exports = {
    Query: {
        // *Get all bugs from DB
        bugs: async () => {
            try {

            } catch (error) {
                return error;
            }

        },
        // *Get bug by its id(uuidv4)
        bug: async () => {
            try {

            } catch (error) {
                return error;
            }
        },

    },
    Mutation: {
        // *Create new bug ticket
        createBug: async () => {
            try {

            } catch (error) {
                return error;
            }
        },
        // *Change bug ticket status (see bug schema def.)
        changeStatus: async () => {
            try {

            } catch (error) {
                return error;
            }

        },
        // *Set bug ticket priority (see bug schema def.)
        setPriority: async () => {
            try {

            } catch (error) {
                return error;
            }
        },
        // *Delete bug ticket by its id(uuidv5)
        deleteBug: async () => {
            try {} catch (error) {
                return error;
            }

        },
    },

    Bug: {
        // if requested bug with user data
        user: async () => {

        }
    },
};