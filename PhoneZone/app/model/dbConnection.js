const mongoose = require('mongoose');
require('../model/user');
require('../model/listing');

// connect to mongodb need right username and passowrd 
const dbURI = 'mongodb+srv://Username:password@cluster0.st1oo.mongodb.net/phoneZone?retryWrites=true&w=majority';
const dbConnection = mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false } )
                    .then((result) => console.log("DB connection established"))
                    .catch((err) => console.log(err));
                    

module.exports = dbConnection;


// async function connect(){
//     let promise = new Promise (
//             mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true } )
//                 .then((result) => console.log("DB connection established"))
//                 .catch((err) => console.log(err))
//     );

//     let dbConnection = await promise;
//     module.exports = dbConnection;


