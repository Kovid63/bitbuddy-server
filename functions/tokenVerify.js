const jwt = require('jsonwebtoken')

async function tokenVerify(token) {
    try {
        const decoded = jwt.verify(token, 'PrivateKey');
        return decoded;
    } catch (err) {
        if(err.message === 'invalid signature'){
            return { code: 1, message: err.message }
        }
        if(err.message === 'jwt expired'){
            return { code: 2, message: err.message }
        }
    }
}

module.exports = { tokenVerify }