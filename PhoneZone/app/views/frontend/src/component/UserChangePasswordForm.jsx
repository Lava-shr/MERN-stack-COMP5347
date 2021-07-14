import React, { Component } from "react";
import { Button, CardDeck, Card, Container, Row, NavItem } from "react-bootstrap";
import NavBar from './NavBar'


function UserChangePasswordForm(props) {
  return (
    <>
    <button style={{marginTop:'50px'}} className="btn btn-secondary" onClick={props.onBackButton}>Back</button><br /><br />
    <form className="signInForm" action="">
    <h3> Change your password:</h3>
       {props.message}
       <form action="">
       <input style={{marginTop:'20px'}}
         type="password"
         placeholder="Old Password"
         className="mr-sm-2"
         id="oldPassword"
      /><br />
       <input
         style={{marginTop:'20px'}}
         type="password"
         placeholder="New Password"
         className="mr-sm-2"
        id="newPassword"
      /><br /><br /><br />

      
          <button className="btn btn-secondary" onClick=
           {props.updatePassword}> 
           Change Password
        </button>
            </form>
    </form>
   </>
        
  );
}


export default UserChangePasswordForm;
