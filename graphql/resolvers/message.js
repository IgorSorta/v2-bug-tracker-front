'use strict';
const axios = require('axios');

module.exports = {
    // *Get all messages in DB
    Query: {
        messages: async () => {
            try {

            } catch (error) {
                return error;
            }

        },
        // *Get message by its id(uuidv4)
        message: async () => {
            try {

            } catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        // *Create new message
        createMessage: async () => {
            try {

            } catch (error) {
                return error;
            }
        },
        deleteMessage: async () => {
            try {

            } catch (error) {
                return error;
            }

        },
    },
    Message: {
        // if request message with user data
        user: async () => {
            try {

            } catch (error) {
                return error;
            }
        }
    },
};