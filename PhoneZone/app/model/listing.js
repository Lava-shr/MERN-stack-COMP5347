const mongoose = require('mongoose');
const UserModel = require('../model/user');
const Schema = mongoose.Schema;
// Schema or table for the Listing


const review = new Schema ({
    reviewer:{ type: String, required: true },
    rating:{ type: Number, required: true },
    comment:{ type: String, required: true },
});

const listSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    seller:{
        type: String,
        required: true
    },
    sellerId:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    reviews:{
        type: [review]
    },
    disabled:{
        type: Boolean
    }
})

const Listing = mongoose.model('Listing', listSchema); 




// Adding all the review listing to DB
function addAllListingFromJson(){

    // Reading Json file
    //const phonelist = require('../../dataset_dev/phonelisting.json');

    // Adding demo data file.
    const phonelist = require('../../demo_data/phonelisting_demo.json');


    for (let i = 0; i < phonelist.length; ++i) {
        let reviewlist = [];
        
        for (let j = 0; j < phonelist[i].reviews.length; ++j){
            UserModel.getUserFullName(phonelist[i].reviews[j].reviewer)
            .then((resolve) => {
                let fullName = resolve.firstname + " " + resolve.lastname;  // Use this if we want to save full name instead of id
                //console.log('Fullname: ', fullName)
                reviewlist.push({  
                    reviewer: fullName,  // change this to full name if we want to save full name instead of id otherwise just phonelist[i].reviews[j].reviewer
                    rating: phonelist[i].reviews[j].rating,
                    comment: phonelist[i].reviews[j].comment
                });
            });
        }
        //console.log(reviewlist);
       
        // Replacing the seller Id with it's full name if not do this for phonelist[i].seller,
        UserModel.getUserFullName(phonelist[i].seller)
        .then((resolve) =>{
            let fullName = resolve.firstname + " " + resolve.lastname;
            disabled = false;
            if('disabled' in phonelist[i]){
                disabled = true;
            } else {
                disabled = false;
            }
            //console.log(fullName);
            const listing = new Listing({
                title: phonelist[i].title,
                brand: phonelist[i].brand,
                image: phonelist[i].image,
                stock: phonelist[i].stock,
                seller: fullName,
                sellerId: phonelist[i].seller,
                price: phonelist[i].price,
                reviews: reviewlist,
                disabled: disabled
            })
            listing.save()
                .then((result) => console.log('data inserted'))
                .catch((err) => console.log(err));
        });
        
    }
}


// deleting all reviews from DB
function deleteAllListingFromdb(){

    Listing.remove({}, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
      });

}

// updating imageurl from all the listing
function updateAllListingFromdb(){
    Listing.updateMany({'brand': 'Apple'}, 
    {'$set': {
        'image': 'Apple'
    }}, 
    function(err) {
        console.log(err);
    })

    Listing.updateMany({'brand': 'BlackBerry'}, 
    {'$set': {
        'image': 'BlackBerry'
    }}, 
    function(err) {
        console.log(err);
    })
    Listing.updateMany({'brand': 'HTC'}, 
    {'$set': {
        'image': 'HTC'
    }}, 
    function(err) {
        console.log(err);
    })
    Listing.updateMany({'brand': 'Huawei'}, 
    {'$set': {
        'image': 'Huawei'
    }}, 
    function(err) {
        console.log(err);
    })
    Listing.updateMany({'brand': 'LG'}, 
    {'$set': {
        'image': 'LG'
    }}, 
    function(err) {
        console.log(err);
    })
    Listing.updateMany({'brand': 'Motorola'}, 
    {'$set': {
        'image': 'Motorola'
    }}, 
    function(err) {
        console.log(err);
    })
    Listing.updateMany({'brand': 'Nokia'}, 
    {'$set': {
        'image': 'Nokia'
    }}, 
    function(err) {
        console.log(err);
    })
    Listing.updateMany({'brand': 'Samsung'}, 
    {'$set': {
        'image': 'Samsung'
    }}, 
    function(err) {
        console.log(err);
    })
    Listing.updateMany({'brand': 'Sony'}, 
    {'$set': {
        'image': 'Sony'
    }}, 
    function(err) {
        console.log(err);
    })

}

// Function to get sold out soon 
async function soldOutSoon (){
    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
                        Listing.find({
                            'disabled':false,
                            'stock':{$gt:0} // give you anything over 0
                            })
                            .sort('stock')
                            .limit(5)
                            .exec(function (err , listing) {
                                if(err) console.log(err);
                                
                                resolve ( listing);
                            })
                        },200);
                    });
                    
        let result = await promise;
        return result;
    
}

// Function to get best Seller
async function bestSellers (){
    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
                        Listing.find({
                                'disabled':false,
                                'reviews.1': { "$exists": true },
                                })
                                .exec(function (err , listing) {
                                    if(err) console.log(err);
                                    resolve (listing);
                                }),{lean:true}
                        },100);
                        });
                    
        let result = await promise;
        return result;
}

// Function to find Title
async function getSearchTitle(searchText){
    let promise = new Promise((resolve,reject)=>{

        setTimeout(()=>{
                            Listing.find({
                                        'disabled':false, //have to double check on this one 
                                        "title": { "$regex": searchText, "$options": "i" }, // https://stackoverflow.com/questions/44833817/mongodb-full-and-partial-text-search
                                     } //i for case insensative

                                    ,function (err , listing) {
                                        if(err) console.log(err);
                                        resolve (listing);
                                        
                                    })
                                
                .catch((err) => console.log(err));
                                            },200);
                                
                                        });
                    
        let result = await promise;
        return result;
}


//Function to find Title with Price Range
async function getSearchTitleWithPriceRange(searchText, lowerLimit, upperLimit){
    
    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
                        Listing.find({
                        'disabled':false, //have to double check on this one \
                        'price': {'$gte': lowerLimit, '$lte': upperLimit}, 
                        'title': { "$regex": searchText, "$options": "i" },//i for case insensative  
                        } 

                        ,function (err , listing) {
                            if(err) console.log(err);
                            resolve (listing);
                            
                        })
                    },200);
        
                });
    
    let result = await promise;
    return result;
}

// Funtion to update the stock to reflect changes that is in cart.
async function checkout(data){

    let promise = new Promise((resolve,reject)=>{

            for(let i=0; i< data.length; ++i){
                newStock = data[i].stock  - parseInt(data[i].quantity, 10);
                //console.log(data[i]._id);
                //console.log(newStock);
                Listing.findByIdAndUpdate(data[i]._id,
                    {stock: newStock}, 
                    function(err, phone){
                        if (err) console.log(err);
                        //console.log(phone.stock);
                    })
            }
        });

    let result = await promise;
    return result;
}



// Get all of the user listing from user's ID
async function getUserListings(user_id){

    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
                        Listing.find(
                            {'sellerId':user_id}, 
                            function (err , listing) {
                                if(err) console.log(err);
                                    resolve(listing)
                                })
        },200);
    });
    let result = await promise;
    return result;
}

// Create new listing for the user
async function addListing(list){
        
    let promise = new Promise((resolve,reject)=>{
                //let user = UserModel.getUserFullName(list.seller);
                //let fullName = user.firstname + " " + user.lastname;
                //console.log(list);
                UserModel.getUserFullName(list.sellerId)
                .then((res) => {
                    let fullName = res.firstname + " " + res.lastname;
                    const listing = new Listing({
                        title:list.title,
                        brand: list.brand,
                        image: list.brand,
                        stock: list.stock,
                        seller: fullName,
                        sellerId: list.sellerId,  
                        price: list.price,
                        reviews: [],
                        disabled: list.disabled
                        })
                        listing.save()
                            .then((result) => console.log('new listing inserted'))
                            .catch((err) => console.log(err));
                            resolve ({
                                'result': true,
                                'message': 'listing has been added successfully',
                                'listing': listing,
                            });
                });
    });

    let result = await promise;
    return result;
}

// Deletes listing 
async function deleteListing(listingId){
        
    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
                        Listing.findByIdAndRemove(listingId, function (err, listing) {
                            if(err) console.log(err);
                            
                            if(listing){
                            resolve ({
                                'result': true,
                                'message': 'Successful deletion'
                            });
                            }else{
                                resolve ({
                                    'result': false,
                                    'message': 'No such listings'
                                });
                            }
                        });
                    })
        },200);

        let result = await promise;
        return result;
}

// Turned disable to true, 
async function disableListing(listingId){

    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
                        Listing.findByIdAndUpdate(listingId,{ 'disabled': true },
                            function (err, listing ) {
                                if(err) console.log(err);

                                resolve({
                                    'result':true,
                                    'message':'Listing disabled successfully',
                                    'listing':listing
                                })
                                })
        },200);
    });
    let result = await promise;
    return result;
}

// Turned disable to false, 
async function enableListing(listingId){

    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
                        Listing.findByIdAndUpdate(listingId,{ 'disabled': false },
                                function (err, listing) {
                                    if(err) console.log(err);
                                    
                                    resolve({
                                        'result':true,
                                        'message':'Listing enabled successfully',
                                        'listing' : listing
                                    })
                                })
        },200);
    });
    let result = await promise;
    return result;
}

// Get one listing object for the given ID
async function getListing(listingId){

    let promise = new Promise((resolve,reject)=>{
                        Listing.findById(listingId,
                                function (err, listing) {
                                    if(err) console.log(err);
                                    
                                    resolve(listing)
                                })
    });
    let result = await promise;
    return result;
}

module.exports = {
    addAllListingFromJson : addAllListingFromJson,
    deleteAllListingFromdb : deleteAllListingFromdb,
    updateAllListingFromdb : updateAllListingFromdb,
    soldOutSoon : soldOutSoon,
    bestSellers : bestSellers,
    getSearchTitle : getSearchTitle,
    getSearchTitleWithPriceRange : getSearchTitleWithPriceRange,
    checkout : checkout,
    getUserListings : getUserListings,
    addListing : addListing,
    deleteListing : deleteListing,
    disableListing : disableListing,
    enableListing : enableListing,
    getListing : getListing,
} 
