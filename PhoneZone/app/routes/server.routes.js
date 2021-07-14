var express = require('express');
var controller = require('../controllers/server.controller');
var userController = require('../controllers/user.controller');
var listingController = require('../controllers/listing.controller');
var router = express.Router();


router.get('/', controller.homePage);

// This 5 routes for now is just for adding sample given data to DB. 
// Need to run /addAllUser first as /addAllListing is getting data fromm the User table
router.post('/addAllUser', controller.addAllUser); // Add all users from JSON file provided
router.delete('/deleteAllUser', controller.deleteAllUser); // Deletes all user from the DB
router.post('/addAllListing', controller.addAllListing); // Add all listing from JSON file provided
router.delete('/deleteAllListing', controller.deleteAllListing); // Delete all listing that are in database.
router.post('/changeImagePath',controller.updateAllListing); // For changing imageUrl path


// User controller for User Specific 
router.post('/addNewUser', userController.addNewUser);  // Adding new user to DB
router.post('/signIn', userController.signIn); // Checks user's credentials
router.patch('/changePassword', userController.changePassword);
router.get('/getUserFullName', userController.getUserFullName);
router.get('/getUserId', userController.getUserId);
// Change first name, last name, email
router.patch('/changeFirstName', userController.changeFirstName);
router.patch('/changeLastName', userController.changeLastName);
router.patch('/changeEmail', userController.changeEmail);

// Manage listing for users only after user is logged in
//get, add, remove, disable, enable listing
router.get('/getUserListings/:id', listingController.getUserListings);  // with id paramater
router.post('/addListing', listingController.addListing);
router.delete('/deleteListing/:id', listingController.deleteListing);
router.patch('/disableListing/:id', listingController.disableListing); // pass in listing id as parameters.
router.patch('/enableListing/:id', listingController.enableListing); 


// listing controller
// for Home State 
router.get('/soldOutSoon', listingController.soldOutSoon); 
router.get('/bestSellers', listingController.bestSellers); 

// for Search state
router.get('/getSearchTitle', listingController.getSearchTitle);
router.get('/getSearchTitleWithPriceRange', listingController.getSearchTitleWithPriceRange);
router.get('/getListing/:id', listingController.getListing);    // get one listing object for the given listing id. Called made with id parameter

// TODO Check out page
// delete the stock of given ids
router.post('/checkout', listingController.checkout);


module.exports = router;