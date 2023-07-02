const mongoose = require("mongoose");

async function databaseInit(connectionUrl, port, database){
    try {
        await mongoose.connect('mongodb+srv://kovid63:kovid%231810@cluster-1.tudcyiw.mongodb.net/Bitbuddy?retryWrites=true&w=majority').then(() => console.log('database connected successfully'))
      } catch (error) {
        console.log(error.message);
      }
}

module.exports = { databaseInit }