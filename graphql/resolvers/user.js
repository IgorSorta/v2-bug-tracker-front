const axios = require('axios');

module.exports = {
    Query: {
        userName: (parent, args, context) => {
            const {
                ctx
            } = context;
            return {
                name: ctx
            };
        },
        micro: async (parent, args, context) => {
            const {
                ctx
            } = context;
            const req = new Promise(resolve => {
                axios.get(`http://127.0.0.1:3000/${ctx}`)
                    .then(function(response) {
                        // handle success
                        console.log(response.data);
                        resolve(response.data);
                    })
                    .catch(function(error) {
                        // handle error
                        console.log(error);
                    });

            });
            return await req;
        },

    }
};