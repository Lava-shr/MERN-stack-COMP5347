var express = require('express');
//const userModel = require('../model/user');
const listingModel = require('../model/listing');


module.exports.homePage = function(req, res) {
    res.render('homepage.ejs');
};


// Adding user from the data provided from assignment specs
module.exports.addAllUser = function(req, res) {
    //userModel.addAllUserFromJson();
    res.render('homepage.ejs');
};


// Deleting all User  data provided from DB
module.exports.deleteAllUser = function(req, res) {
    //userModel.deleteAllUserFromdb();
    res.render('listing.ejs');
};


// Adding listings from the data provided from assignment specs
module.exports.addAllListing = function(req, res) {
    //listingModel.addAllListingFromJson();
    res.render('listing.ejs');
};

// Deleting all listings from DB
module.exports.deleteAllListing = function(req, res) {
    //listingModel.deleteAllListingFromdb();
    res.render('listing.ejs');
};

// Update image with it's brand name instead of imageurl
module.exports.updateAllListing = function(req, res) {
    //listingModel.updateAllListingFromdb();
    res.render('listing.ejs');
};
