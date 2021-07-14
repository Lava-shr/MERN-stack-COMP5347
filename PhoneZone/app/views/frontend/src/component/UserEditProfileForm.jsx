import React, { Component } from "react";
import { Button, CardDeck, Card, Container, Row, NavItem } from "react-bootstrap";
import NavBar from './NavBar'


function UserEditProfileForm(props) {
  return (    
<>
 <button className="btn btn-secondary" onClick={props.onBackButton}>Back</button><br /><br />
      <h3>{props.message}</h3>
<form className="signInForm" action="">
<span style={{fontWeight:"bold" , marginRight:"10px"}}>{props.userData.firstName}{'  '}:</span><input
        type="Text"
        placeholder="New First Name"
        className="mr-sm-2"
        id="firstName"
      /><br />
      <br />
    <span style={{fontWeight:"bold" , marginRight:"10px"}}> {props.userData.lastName}{'  '}:</span>
      <input
        type="Text"
        placeholder="New Last Name"
        className="mr-sm-2"
        id="lastName"
      /><br />
      <br />
     <span style={{fontWeight:"bold" , marginRight:"10px"}}> {props.userData.email}{'  '}:</span>
      <input
        type="email"
        placeholder="New Email"
        className="mr-sm-2"
        id="email"
      /><br />
      <br />
          <button 
          className="btn btn-dark"
          onClick=
          {props.updateProfile}
           > 
          Update Profile
          </button>
       </form>
       </>
  );
}


export default UserEditProfileForm;

