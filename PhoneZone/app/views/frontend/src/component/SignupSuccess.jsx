import React, { Component } from "react";
import { Button, CardDeck, Card, Container, Row } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import UserPage from "../UserPage";

function SignupSuccess(props) {
  //sessionStorage.setItem("token", props.email);
  //sessionStorage.setItem("loginSession", "test user");
  
  return (
    <React.Fragment>
    <br/>
      <div
 className="alert alert-secondary" role="alert">
      <h3 style={{marginBottom:'30px'}}>{props.message}</h3>
      {/* <Route path={"/" + props.linkToItem} component={UserPage} /> */}
      <Link to={props.linkToItem ? "/" + props.linkToItem : "/"}>
        <button className="mr-sm-2 btn btn-secondary">
          {props.linkToItem ? "Go back to the Item" : "Go to the Main page"}
        </button>
        <Link style={{color:'red'}}to='/userpage'> Go to your profile</Link>
      </Link>
      <br />
      
</div>
    </React.Fragment>

  );
}
export default SignupSuccess;
