const bcrypt = require('bcrypt');

const sendCookie = (data, context) => {
    context.res.cookie('access_token', 'Bearer ' + data, {
        expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
        httpOnly: true,
    })
}

const hashPassword = async (password) => {
    const hash = bcrypt.hashSync(password, 10, (error) => {
        if (error) throw new Error('hashPassword error: ', error);
    });
    return hash;
}

module.exports = {
    sendCookie,
    hashPassword,
}