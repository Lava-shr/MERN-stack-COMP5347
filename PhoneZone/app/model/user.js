const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CryptoJS = require("crypto-js")
const dbConnection = require('../model/dbConnection');
const { resolve } = require('path');
// // Schema or table for the User


const userSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}) 

const User = mongoose.model('User', userSchema); // Pluralise it and looks for it on database.


// Adding all user data from Json file to DB
function addAllUserFromJson(){
    // Reading Json file
    //const userlist = require('../../dataset_dev/userlist.json');

    // Adding demo data
    const userlist = require('../../demo_data/userlist_demo.json');
    // looping throuhg list and updating it to db.
    let ObjectId = mongoose.Types.ObjectId;
    for (let i = 0; i < userlist.length; ++i) {
        const user = new User({
        _id: new ObjectId(userlist[i]._id.$oid),
        firstname:userlist[i].firstname,
        lastname:userlist[i].lastname,
        email:userlist[i].email,
        password:userlist[i].password
        })
        user.save()
            .then((result) => console.log('data inserted'))
            .catch((err) => console.log(err));
    }
    
    // User.findByIdAndDelete('5f5237a4c1beb1523fa3da04')
    //     .then((result) => console.log('data deleted'))

}


// Deleting all user from DB 
function deleteAllUserFromdb(){

    User.remove({}, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
      });
}

// Add new user to the Database
async function addNewUser(firstname, lastname, email, password ){
    
    let promise = new Promise((resolve,reject)=>{

        setTimeout(()=>{
                    User.find({'email':email}, function (err , user) {
                        if(err) console.log(err);
                
                        if(user.length > 0){
                            resolve ({
                                'result': false,
                                'message': 'email Id already taken'
                            });
                        }else{
                            // Adding new user to DB and converting password to MD5 hash
                            const md5 = CryptoJS.MD5(password);
                            const md5Password = (md5.toString()); 
                            const user = new User({
                            firstname:firstname,
                            lastname:lastname,
                            email:email,
                            password:md5Password
                            })
                            user.save()
                                .then((result) => console.log('new user inserted'))
                                .catch((err) => console.log(err));
                                resolve ({
                                    'result': true,
                                    'message': 'successful'
                                });
                        };
                    })
            },250);

        });
        let result = await promise;
        return result;
    }

// Check User sign in is correct 
async function checkUserCredentials(email, password){

    let promise = new Promise((resolve,reject)=>{

        setTimeout(()=>{
                    User.find({'email':email}, function (err , user) {
                        if(err) console.log(err);
                
                        if(user.length < 1){
                            resolve ({
                                'result': false,
                                'message': 'No user with that email'
                            });
                        }else{
                            // Checking password match
                            const md5 = CryptoJS.MD5(password);
                            const md5Password = (md5.toString()); 
                            if(md5Password === user[0].password){
                                resolve ({
                                    'result': true,
                                    'message': 'successful',
                                    'firstname': user[0].firstname,
                                    'lastname': user[0].lastname,
                                    'email': user[0].email 
                                });
                            }else{
                                resolve ({
                                    'result': false,
                                    'message': "Password didn't match",
                                });
                            }  
                        };
                    })
            },250);

        });
        let result = await promise;
        return result;
}

// Change user's password. returns user informations
async function changePassword(email, password){

    let promise = new Promise((resolve,reject)=>{
        const md5 = CryptoJS.MD5(password);
        const md5Password = (md5.toString());
        setTimeout(()=>{
                        User.updateOne(
                            {'email':email}, 
                            { password: md5Password },
                            function (err , docs) {
                                if(err) console.log(err);
                                    resolve({
                                        'user':docs
                                    })
                                })
        },250);
    });
    let result = await promise;
    return result;

    
}


// returns user Full name informations
async function getUserFullName(userId){

    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
                        User.findById(userId,
                            function (err , user) {
                                if(err) console.log(err);
                                    resolve(user);
                                })
        },250);
    });
    let result = await promise;
    return result;
    
}

// returns user Full name informations
async function getUserFullNameForDB(userId){

    let promise = new Promise((resolve,reject)=>{
                        User.findById(userId,
                            function (err , user) {
                                if(err) console.log(err);
                                    resolve(user);
                                })
        
    });
    let result = await promise;
    return result;
    
}

// returns user ID from their email informations
async function getUserId(email){

    //console.log(email)
    let promise = new Promise((resolve,reject)=>{
        
        User.find({'email':email}, function (err , user) {
                                if(err) console.log(err);
                                resolve(user);
                                })
    });
    let result = await promise;
    return result;   
}

// Changes first name returns user object back
async function changeFirstName(email, firstName){

    let promise = new Promise((resolve,reject)=>{
                        User.updateOne(
                            {'email':email}, 
                            { firstname: firstName },
                            function (err , docs) {
                                if(err) console.log(err);
                                    resolve(docs)
                                })
        });
    let result = await promise;
    return result;
}

// Changes last name returns user object back
async function changeLastName(email, lastName){

    let promise = new Promise((resolve,reject)=>{
                        User.updateOne(
                            {'email':email}, 
                            { lastname: lastName },
                            function (err , docs) {
                                if(err) console.log(err);
                                    resolve(docs)
                                })
        });
    let result = await promise;
    return result;
}

// Changes email and returns user object back
async function changeEmail(email, newEmail){

    let promise = new Promise((resolve,reject)=>{
                        User.updateOne(
                            {'email':email}, 
                            { email: newEmail},
                            function (err , docs) {
                                if(err) console.log(err);
                                    resolve(docs)
                                })
        });
    let result = await promise;
    return result;
}

async function checkEmailExist(email){
    let promise = new Promise ((resolve,reject) => {

            User.find({'email':email}, function (err , user) {
                if(err) console.log(err);
                // console.log(user.length);
                // console.log(user.length === 0)
                // console.log(user.length !== 0)
                if(user.length === 0){
                    resolve ({
                        'result': true,
                        'message': 'email Id not taken'
                    })
                }else {
                    resolve ({
                        'result': false,
                        'message': 'email Id already taken'
                    })   
                }
            });
    })
    let result = await promise;
    return result;
}


// To use elsewhere in the Project.
module.exports = {
    addAllUserFromJson : addAllUserFromJson,
    deleteAllUserFromdb : deleteAllUserFromdb,
    addNewUser : addNewUser,
    checkUserCredentials : checkUserCredentials,
    changePassword : changePassword,
    getUserFullName : getUserFullName,
    getUserId : getUserId,
    changeFirstName : changeFirstName,
    changeLastName : changeLastName,
    changeEmail : changeEmail,
    checkEmailExist : checkEmailExist,

} 

