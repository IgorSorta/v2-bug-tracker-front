const {
    validateToken
} = require('./JWT');

const getMe = (req) => {
    const header = req.headers.authorization || '';
    console.log(header)
    if (header) {
        const token = header.replace('Bearer%20', '');
        const decoded = validateToken(token);
        return decoded;
    }

}

module.exports = getMe;