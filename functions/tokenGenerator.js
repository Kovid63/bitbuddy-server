const jwt = require('jsonwebtoken');

function tokenGenerator(data) {
    const jwtToken = jwt.sign(data, 'PrivateKey', { expiresIn: '1y' });
    return jwtToken;
}

module.exports = { tokenGenerator };