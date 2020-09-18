'use strict';
const axios = require('axios').default;

function requestApi(url) {
    return function(data = null, method = 'GET') {
        try {
            let options = method === 'POST' ? {
                url: url,
                method: method,
                data: data
            } : {
                url: url,
                method: method,
                params: data
            };

            const response = axios(options);
            if (!response) throw new Error('requestApi() error.');

            return response;

        } catch (error) {
            console.log(error);
        }
    }
}

// requestDbApi(url) {
//     // Request DB server by axios
//     // default method is "GET"
//     return function(data = null, method = 'GET') {
//         try {
//             let options = method === 'POST' ? {
//                 url: url,
//                 method: method,
//                 data: data
//             } : {
//                 url: url,
//                 method: method,
//                 params: data
//             };

//             const response = axios(options);
//             if (!response) throw new Error('requestApi() error.');

//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
module.exports = requestApi;