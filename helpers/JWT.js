require('dotenv').config()
const jwt = require('jsonwebtoken');

// Create and validate jsonwebtoken
module.exports = {
    createToken(payload) {
        try {
            const token = jwt.sign(payload, process.env.ACCESS_SECRET);

            return token;
        } catch (error) {
            if (error) return null;
        }

    },
    validateToken(token) {
        try {
            return jwt.verify(token, process.env.ACCESS_SECRET)

        } catch (error) {
            if (error) return null;
        }
    }
}