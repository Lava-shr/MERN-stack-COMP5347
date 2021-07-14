import React, { Component } from "react";
import { Button, CardDeck, Card, Container, Row } from "react-bootstrap";

//const listing = {
  //           title: "Samsung A777- Blue",
  //           brand: "Samsung",
  //           image: "image",
  //           stock: 100,
  //           sellerId: "5f5237a4c1beb1523fa3da39",
  //           price: 59.99,
  //           reviews: [],
  //           disabled: false
  //           }

function UserListingForm(props) {
  
  return (

    <React.Fragment>
       <button onClick={props.onBackButton}>Back</button>
       <h3> {props.message}</h3><br /><br />
    <form action="">
      <input
        type="text"
        placeholder="Title"
        className="mr-sm-2"
        id="title"
      /><br />
      Brand
      <select name="brand" id="brand">
        <option value="Apple">Apple</option>
        <option value="Blackberry">Blackberry</option>
        <option value="HTC">HTC</option>
        <option value="Huawei">Huawei</option>
        <option value="LG">LG</option>
        <option value="Motorola">Motorola</option>
        <option value="Nokia">Nokia</option>
        <option value="Samsung">Samsung</option>
        <option value="Sony">Sony</option>
      </select><br />
      <input
        type="Number"
        placeholder="Stock"
        className="mr-sm-2"
        id="stock"
      /><br />
      <input
        type="Number"
        step="0.01"
        placeholder="Price"
        className="mr-sm-2"
        id="price"
      /><br />
      Disable this
      <select name="disable this" id="disable">
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      <br /><br />
      <button onClick={props.handleListing}>Add this Listing</button>
      
    </form>
    <br />
  </React.Fragment>
  );
}

//}
//}

export default UserListingForm;
