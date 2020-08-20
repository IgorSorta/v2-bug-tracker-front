'use strict';
const axios = require('axios');

// Request remote API 
//url example = 'http://127.0.0.1:3000'
//params example = {ID: 12345}
// function requestApi(url, params) {
//     return new Promise(resolve => {
//         axios.get(url, {
//                 params: params
//             })
//             .then(function(response) {
//                 // handle success
//                 resolve(response.data);
//             })
//             .catch(function(error) {
//                 // handle error
//                 console.log(error);
//             });
//     });
// }

function requestApi(url) {
    return async function(params) {
        try {
            const response = axios.get(url, {
                params: params
            });
            if (!response) throw new Error('requestApi() error.');
            return response;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = requestApi;