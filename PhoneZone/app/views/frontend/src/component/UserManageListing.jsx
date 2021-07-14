import React, { Component } from "react";
import { Button, CardDeck, Card, Container, Row } from "react-bootstrap";
import UserListingCard from "./UserListingCard";
import NavBar from './NavBar'


function UserManageListing(props) {
  return (
    <>
    <button className="btn btn-secondary" onClick={props.onBackButton}>Back</button>
   <form className="signInForm" action="">           
       <h3> Your Listings</h3>
       <br />
       <Row>
         {props.data?.map((item) => (
          <UserListingCard onClick={props.onCardClick} item={item} key={item._id} />
         ))}
       </Row>
       <br />
       <button className="btn btn-secondary" onClick={props.addListing}>Add Listing</button>
             
           </form>
           </>
 
    // <Container>
    //   <button onClick={props.onBackButton}>Back</button>
    //   <h3> Your Listings</h3>
    //   <br />
    //   <Row>
    //     {props.data?.map((item) => (
    //       <UserListingCard onClick={props.onCardClick} item={item} key={item._id} />
    //     ))}
    //   </Row>
    //   <br />
    //   <button onClick={props.addListing}>Add Listing</button>
      
    // </Container>
  );
}


export default UserManageListing;
