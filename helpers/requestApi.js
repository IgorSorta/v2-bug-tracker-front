'use strict';
const axios = require('axios').default;

// Request remote API 
// url example = 'http://127.0.0.1:3000'
// params example = {ID: 12345}

// method for axios = "GET"(default),"POST","PUT","PATCH","DELETE"
// data example = {data: data}

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
    return function(data, method = 'GET') {
        try {

            if (method === 'POST') {
                const response = axios({
                    url: url,
                    method: method,
                    data: data
                });
                if (!response) throw new Error('requestApi() error.');
                return response;
            }
            const response = axios({
                url: url,
                method: method,
                params: data
            });
            if (!response) throw new Error('requestApi() error.');
            return response;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = requestApi;