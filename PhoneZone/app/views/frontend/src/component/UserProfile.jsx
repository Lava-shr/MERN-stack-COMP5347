import React, { Component } from "react";
import { Button, CardDeck, Card, Container, Row } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import UserListingCard from "./UserListingCard";
import NavBar from './NavBar'


function UserListingCards(props) {
  return (

<>
<br />
      <Link to="/">
          <button className="btn btn-secondary">Go to Home Page</button><br />
      </Link>
<button className="btn btn-danger float-right" onClick={props.signOut}>Sign out</button>
<span style={{fontWeight:"bold"}}></span> <span>{props.profileUpdateMessage}</span><br /><br />

<span style={{fontWeight:"bold"}}>Hi </span> <span>{props.fullName}</span>
       <br />
    
       <Row>
         {props.data?.map((item) => (
           <UserListingCard onClick={props.onCardClick} item={item} key={item._id} />
         ))}
         
       </Row>     
      <br /><br /><br />
       

       <button style={{marginRight:'20px'}} className="btn btn-secondary" onClick={props.editProfile}>Edit Profile</button>
       <button style={{marginRight:'20px'}} className="btn btn-secondary" onClick={props.changePassword}>Change Password</button>
       <button style={{marginRight:'20px'}} className="btn btn-secondary" onClick={props.manageListing}>Manage Listing</button>
   
       </>

  );
}


export default UserListingCards;
