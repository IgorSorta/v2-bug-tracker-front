'use strict';
const requestApi = require('../../helpers/requestApi');

const requestUser = requestApi('http://127.0.0.1:3000/user');
const requestMessage = requestApi('http://127.0.0.1:3000/message');
const requestBug = requestApi('http://127.0.0.1:3000/bug');

module.exports = {
    Query: {
        // *Get current logged in user
        me: async (parent, args, context) => {
            const {
                me
            } = context;
            try {
                const user = requestUser({
                    me: me
                })
                return await user;
            } catch (error) {
                return error;
            }

        },
        // *Get user where id is (uuidv4)
        user: async (parent, args, context) => {
            const {
                id
            } = args;
            try {
                const user = requestUser({
                    id: id
                });
                return await user;
            } catch (error) {
                return error;
            }

        },
        // *Get all users from DB
        users: async (parent, args, context) => {
            try {
                const users = requestUser();
                return await users;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        // TODO *Register user and return token
        signUp: async (parent, args, context) => {
            const {
                name,
                email,
                password
            } = args;
            try {
                const result = requestUser({
                    name: name,
                    email: email,
                    password: password
                }, 'POST');
                return await result;
            } catch (error) {
                return error;
            }

        },
        // TODO*Login user (and return token)
        signIn: async (parent, args, context) => {
            const {
                login,
                password
            } = args;
            try {
                const result = requestUser({
                    login: login,
                    password: password
                }, 'POST');
                return await result;
            } catch (error) {
                return error;
            }

        },
        // TODO *Delete user with id(uuidv4)
        deleteUser: async (parent, args, context) => {
            const {
                id
            } = args;
            try {
                const result = requestUser({
                    id: id
                }, 'DELETE');
                return await result;
            } catch (error) {
                return error;
            }

        },
        // TODO *Chage user role(USER, ADMIN)
        changeRole: async (parent, args, context) => {
            const {
                id,
                name,
                role
            } = args;
            try {
                const result = requestUser({
                    id: id,
                    name: name,
                    role: role
                }, 'PATCH');
                return await result;
            } catch (error) {
                return error;
            }

        }

    },
    // TODO If user requested with nested queries
    User: {
        messages: async (user, args, context) => {
            const result = requestMessage({
                userId: user.id
            });
            return await result;
        },
        bugs: async (user, args, context) => {
            const result = requestBug({
                userId: user.id
            });
            return await result;
        }
    },
};