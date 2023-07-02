const bcrypt = require('bcrypt');

async function passwordCheck(password, hash){
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.log(error); //change for prod
    }
}

module.exports = { passwordCheck };