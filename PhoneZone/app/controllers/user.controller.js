var express = require('express');
const userModel = require('../model/user');

module.exports.addNewUser = function(req, res ) {

    userModel.addNewUser(req.body.firstname, req.body.lastname, req.body.email, req.body.password)
        .then((resolve) => {
                            if(resolve.result == false){
                                res.status(200);
                                res.end(JSON.stringify(resolve));
                            }else{
                                res.status(200);
                                res.end(JSON.stringify(resolve));
                            }
                        })
        .catch((err) => console.log(err));
   
};

module.exports.signIn = function(req, res) {

    userModel.checkUserCredentials(req.body.email, req.body.password)
        .then((resolve) => {
            if(resolve.result == false){
                res.status(200);
                res.end(JSON.stringify(resolve));
            }else{
                res.status(200);
                res.end(JSON.stringify(resolve));
            }

        })
        .catch((err) => console.log(err));
};


module.exports.changePassword = function(req, res) {

    //console.log(req.body)
    userModel.changePassword(req.body.email, req.body.password)
        .then((resolve) => {
                //console.log(resolve);
                res.status(200);
                res.end(JSON.stringify(resolve)); // returns user informations

        })
        .catch((err) => console.log(err));
    
};

// get user First name and last name getFullName
module.exports.getUserFullName = function(req, res) {

    userModel.getUserFullName(req.query.id)
        .then((resolve) => {
                let name = resolve.firstname + " " + resolve.lastname;
                //let fullName = {fullName: name};
                //console.log(fullName);
                res.status(200);
                res.end(JSON.stringify(name)); // returns user full name

        })
        .catch((err) => console.log(err));
    
};

//get user ID from their email
module.exports.getUserId = function(req, res) {

    userModel.getUserId(req.query.email)
        .then((resolve) => {
                res.status(200);
                res.end(JSON.stringify(resolve[0])); // returns user ID
        })
        .catch((err) => console.log(err));
    
};

// Change User's First Name
module.exports.changeFirstName = function(req, res) {

    //console.log(req.body)
    userModel.changeFirstName(req.body.email, req.body.firstname)
        .then((resolve) => {
                //console.log(resolve);
                res.status(200);
                res.end(JSON.stringify(resolve)); // returns user informations

        })
        .catch((err) => console.log(err));
};

// Change User's last Name
module.exports.changeLastName = function(req, res) {

    //console.log(req.body)
    userModel.changeLastName(req.body.email, req.body.lastname)
        .then((resolve) => {
                res.status(200);
                res.end(JSON.stringify(resolve)); // returns user informations

        })
        .catch((err) => console.log(err));
};

// Change User's email
module.exports.changeEmail = function(req, res) {

    userModel.checkEmailExist(req.body.newemail)
        .then((resolve) => {
           // console.log(resolve)
            if(resolve.result){
                userModel.changeEmail(req.body.email, req.body.newemail)
                    .then((resolves) => {
                        res.status(200);
                        res.end(JSON.stringify(resolve)); // returns user informations
                    })
                    .catch((err) => console.log(err));
            }else{
                res.status(200);
                res.end(JSON.stringify(resolve));
            }
        })
        .catch((err) => console.log(err));
};
