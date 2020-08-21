'use strict';
const requestApi = require('../../helpers/requestApi');

const requestUser = requestApi('http://127.0.0.1:3000/user');
const requestBug = requestApi('http://127.0.0.1:3000/bug');

module.exports = {
    Query: {
        //TODO *Get all bugs from DB
        bugs: async (parent, args, context) => {
            try {
                const bugs = requestBug();
                return await bugs;
            } catch (error) {
                return error;
            }

        },
        //TODO *Get bug by its id(uuidv4)
        bug: async (parent, args, context) => {
            const {
                id
            } = args;
            try {
                const bug = requestBug({
                    id: id
                });
                return await bug;
            } catch (error) {
                return error;
            }
        },

    },
    Mutation: {
        //TODO *Create new bug ticket
        createBug: async (parent, args, context) => {
            const {
                title,
                description
            } = args;
            const {
                me
            } = context;
            try {
                const result = requestBug({
                    title: title,
                    description: description,
                    userId: me.id
                }, 'POST');
                return await result;
            } catch (error) {
                return error;
            }
        },
        //TODO *Change bug ticket status (see bug schema def.)
        changeStatus: async (parent, args, context) => {
            const {
                id,
                status
            } = args;
            try {
                const result = requestBug({
                    id: id,
                    status: status
                }, 'POST');
                return await result;
            } catch (error) {
                return error;
            }

        },
        //TODO *Set bug ticket priority (see bug schema def.)
        setPriority: async (parent, args, context) => {
            const {
                id,
                priority
            } = args;
            try {
                const result = requestBug({
                    id: id,
                    priority: priority
                }, 'PATCH');
                return await result;
            } catch (error) {
                return error;
            }
        },
        //TODO *Delete bug ticket by its id(uuidv5)
        deleteBug: async (parent, args, context) => {
            const {
                id
            } = args;
            try {
                const result = requestBug({
                    id: id
                }, 'DELETE');
                return await result;
            } catch (error) {
                return error;
            }

        },
    },

    Bug: {
        //TODO if requested bug with user data
        user: async (bug, args, context) => {
            try {
                const user = requestUser({
                    id: bug.userId
                });
                return await user;
            } catch (error) {
                return error;
            }
        }
    },
};