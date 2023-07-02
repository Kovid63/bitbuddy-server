const bcrypt = require('bcrypt');

async function hashPassword(password){
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        console.log(error); //change for prod
    }
}

module.exports = { hashPassword };