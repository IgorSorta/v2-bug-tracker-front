'use strict';
const requestApi = require('../../helpers/requestApi');
const {
    sendCookie,
    hashPassword,
} = require('../../helpers/handler');
const JWT = require('../../helpers/JWT');

//TODO 
// Saving user basic information to db
// Creating token for authentication and send it to user
// Request token from user and it parse it to authenticate user
// (for every request checks user permision)
// Graphql server sends -> (request or mutation data + server token)
// Database server -> (checking gql_server token) -> (checking if data is correct) 
//  -> if correct (execute request or mutation ) -> (sending response wint some data)
//  -> if not correct or unauthorized (sendin error message)

const requestUser = requestApi('http://127.0.0.1:3030/user/params');
const registerUser = requestApi('http://127.0.0.1:3030/user/params')
const requestMessage = requestApi('http://127.0.0.1:3030/message/params');
const requestBug = requestApi('http://127.0.0.1:3030/bug/params');

module.exports = {
    Query: {
        // *Get current logged in user
        me: async (parent, args, context) => {
            const {
                me
            } = context;
            try {
                console.log(me)
                const data = {
                    select: "*",
                    where: {
                        name: me.name,
                        password: me.password
                    }
                };
                const user = await requestUser(data, 'POST')
                console.log(user.data.data[0]);
                return user.data.data[0]

            } catch (error) {
                return error;
            }

        },
        // *Get user where id is (uuidv4)
        user: async (parent, args, context) => {
            const {
                user_id
            } = args;
            try {
                const data = {
                    select: "*",
                    where: {
                        user_id: user_id
                    }
                };
                const user = await requestUser(data, 'POST');
                console.log(user.data.data[0]);
                return user.data.data[0];
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
        },
    },
    Mutation: {
        // TODO *Register user and return token
        signUp: async (parent, args, context) => {
            const {
                name,
                email,
                password
            } = args;

            const token = JWT.createToken({
                name,
                email,
            });

            const result = registerUser({
                name,
                email,
                password: await hashPassword(password),
            }, "POST");

            if (result !== null || typeof(result) !== Error) {
                sendCookie(token, context);
            }

            return {
                token: token
            };
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

                const token = JWT.createToken({
                    name,
                    password,
                });
                // TODO send name and pass to find user

                if (!result) throw new Error('signIn error');
                if (result !== null || typeof(result) !== Error) {
                    sendCookie(token, context);
                }

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
            const data = {
                select: "*",
                where: {
                    user_id: user.user_id
                }
            };
            const result = await requestBug(data, 'POST');
            console.log(result.data.data)
            return result.data.data;
        }
    },
};