const { request } = require('express');
var express = require('express');
const listingModel = require('../model/listing');

module.exports.soldOutSoon = function (req, res){
    listingModel.soldOutSoon()
        .then((resolve) => {
                    //console.log('reached here: ', resolve);
                    res.status(200);
                    res.end(JSON.stringify(resolve));
        })
        .catch((err) => console.log(err));
}

module.exports.bestSellers = function (req, res){
    listingModel.bestSellers()
        .then((resolve) => {
                   // console.log('length of listing with review: ' + resolve.length);
                    getAverageRatingAndSort(resolve);
                    res.status(200);
                    res.end(JSON.stringify(resolve.slice(0,5)));
                    
        })
        .catch((err) => console.log(err));
}


// Function to get average ratings and sort the listing based on that ratings
async function getAverageRatingAndSort(listing){
    
    let promise = new Promise((resolve,reject)=>{
        for(let i=0; i< listing.length; ++i){
            let total = 0;
            let average = 0;
            for(let j=0; j<listing[i].reviews.length; ++j){
                total += listing[i].reviews[j].rating;
            }
            average = total/listing[i].reviews.length;
            listing[i]['averageReview'] = average;
        }
        listing.sort(function(a, b){
            return b.averageReview - a.averageReview;
        })
        resolve(listing);
    });
    let result = await promise;
    return result;

}

// Get search of the Title; Return arrays of the listing that have matched the title.
module.exports.getSearchTitle = function (req, res){
    
    //console.log(req.query.searchText)
    listingModel.getSearchTitle(req.query.searchText)
        .then((resolve) => {
            res.status(200);
            //console.log(resolve);
            res.end(JSON.stringify(resolve));
        
    })
    .catch((err) => console.log(err));
}

//Get Search of the Title with the price range 
module.exports.getSearchTitleWithPriceRange = function (req, res){
    listingModel.getSearchTitleWithPriceRange(req.query.searchText, req.query.lowerLimit, req.query.upperLimit)
        .then((resolve) => {

            for(let i = 0; i < resolve.length; ++i){
                console.log(resolve[i].title);
                console.log(resolve[i].price);
            }
            res.status(200);
            res.end(JSON.stringify(resolve));
    })
    .catch((err) => console.log(err));
}

// Clearing the cart and reducing the number of stocks
module.exports.checkout = function (req, res){
    // will receive the arrays of json data with following format
    // [{
    //    listing_primary_key: ....,
    //    stock_to_delete: .....   }]
    //console.log(req.body);
    listingModel.checkout(req.body)
        .then((resolve) => {
            res.status(200);
            res.end(JSON.stringify(resolve));
    })
    .catch((err) => console.log(err));
}

// Returns all the listings that user has from their ID
module.exports.getUserListings = function(req, res) {

    //console.log(req.params.id);
    listingModel.getUserListings(req.params.id)
        .then((resolve) => {
                //console.log(resolve);
                res.status(200);
                res.end(JSON.stringify(resolve));
        })
        .catch((err) => console.log(err));
    
};

// Add listings for the user
module.exports.addListing = function(req, res) {

    //console.log(req.body.title);

    listingModel.addListing(req.body)
        .then((resolve) => {
                //console.log(resolve);
                res.status(200);
                res.end(JSON.stringify(resolve));
        })
        .catch((err) => console.log(err));
    
};

// Delete listing, retuns message if it's successful or not
module.exports.deleteListing = function(req, res) {

    listingModel.deleteListing(req.params.id)
        .then((resolve) => {
                //console.log(resolve);
                res.status(200);
                res.end(JSON.stringify(resolve));
        })
        .catch((err) => console.log(err));

};

// Turn disable to true for the listing
module.exports.disableListing = function(req, res) {

    listingModel.disableListing(req.params.id)
        .then((resolve) => {
                res.status(200);
                res.end(JSON.stringify(resolve));
        })
        .catch((err) => console.log(err));

};

// Turn disable to false for the listing 
module.exports.enableListing = function(req, res) {

    listingModel.enableListing(req.params.id)
        .then((resolve) => {
                res.status(200);
                res.end(JSON.stringify(resolve));
        })
        .catch((err) => console.log(err));

};

// Get the listing object for the giving id getListing
module.exports.getListing= function(req, res) {

    listingModel.getListing(req.params.id)
        .then((resolve) => {
                res.status(200);
                res.end(JSON.stringify(resolve));
        })
        .catch((err) => console.log(err));

};

/*
// Function to change Ids of the seller and reviewers to name Not needed
async function changeIdToName(listing){

    let promise = new Promise((resolve,reject)=>{
        for(let i=0; i< listing.length; ++i){

            for(let j=0; j<listing[i].reviews.length; ++j){
                    UserModel.getUserFullName(listing[i].reviews[j].reviewer)
                        .then((resolve) => {
                            //console.log(listing[i].reviews[j].reviewer);
                            let fullName = resolve.firstname + " " + resolve.lastname;
                            //console.log(fullName);
                            //listing[i].reviews[j].toObject();
                            listing[i].reviews[j].reviewerName= fullName;
                            //console.log(listing[i].reviews[j]['reviewerName']);
                        })
    
            }

            UserModel.getUserFullName(listing[i].seller)
                .then((resolve) => {
                    let fullName = resolve.firstname + " " + resolve.lastname;
                    //console.log("seller: ", fullName);
                    listing[i].sellerName = fullName;
                    console.log(listing[i].sellerName);
                })
        }
        resolve(listing);
    });
    let result = await promise;

    return result;
    
}*/