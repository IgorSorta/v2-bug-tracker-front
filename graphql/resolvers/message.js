'use strict';
const requestApi = require('../../helpers/requestApi');

const requestUser = requestApi('http://127.0.0.1:3000/user');
const requestMessage = requestApi('http://127.0.0.1:3000/message');

module.exports = {
    //TODO *Get all messages in DB
    Query: {
        messages: async (parent, args, context) => {
            try {
                const messages = requestMessage();
                return await messages;
            } catch (error) {
                return error;
            }

        },
        //TODO *Get message by its id(uuidv4)
        message: async (parent, args, context) => {
            const {
                id
            } = args;
            try {
                const message = requestMessage({
                    id: id
                })
                return await message;
            } catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        //TODO *Create new message
        createMessage: async (parent, args, context) => {
            const {
                text
            } = args;
            const {
                me
            } = context;
            try {
                const result = requestMessage({
                    text: text,
                    userId: me.id
                }, 'POST');
                return await result;
            } catch (error) {
                return error;
            }
        },
        // TODO Delete message
        deleteMessage: async (parent, args, context) => {
            const {
                id
            } = args;
            try {
                const result = requestMessage({
                    id: id
                }, 'DELETE');
                return await result;
            } catch (error) {
                return error;
            }

        },
    },
    Message: {
        //TODO if request message with user data
        user: async (message, args, context) => {
            try {
                const user = requestUser({
                    id: message.userId
                });
                return await user;
            } catch (error) {
                return error;
            }
        }
    },
};