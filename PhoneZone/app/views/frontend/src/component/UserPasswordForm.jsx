import React, { Component } from "react";
import { Button, CardDeck, Card, Container, Row, NavItem } from "react-bootstrap";


function UserPasswordForm(props) {
  return (
    <Container>
        <br /><br />
        {props.message}
        <form action="">
            <input
                type="password"
                placeholder="Password"
                className="mr-sm-2"
                id="password"
            />
            <br />
            <button 
          
          onClick=
          {props.updateProfile}
           > Submit
           </button>
    </form>
    </Container>
    
  );

}
export default UserPasswordForm;
