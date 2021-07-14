const mongoose = require('mongoose');
require('../model/user');
require('../model/listing');

// connect to mongodb username: admin; pass:comp5347
const dbURI = 'mongodb+srv://admin:comp5347@cluster0.st1oo.mongodb.net/phoneZone?retryWrites=true&w=majority';
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


