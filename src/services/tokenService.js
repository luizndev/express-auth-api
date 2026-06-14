const jwt = require('jsonwebtoken');

const TOKEN_EXPIRES_IN = '1h';

function getSecret() {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET é obrigatóri');
    }

    return process.env.JWT_SECRET;
}

function sign(user) {
    return jwt.sign(
        { id: user.id },
        getSecret(),
        { expiresIn: TOKEN_EXPIRES_IN }
    );
}

function verify(token) {
    return jwt.verify(token, getSecret());
}

module.exports = {
    sign,
    verify,
};
