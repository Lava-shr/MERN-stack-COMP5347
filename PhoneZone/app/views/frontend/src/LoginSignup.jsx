import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Signup from "./component/Signup";
import SignIn from "./component/SignIn";
import SignupUnsuccess from "./component/SignupUnsuccess";
import SignupSuccess from "./component/SignupSuccess";
import UserPage from "./UserPage";
import { withRouter } from "react-router";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
const URL = "http://localhost:8000/";

class LoginSignup extends Component {
  state = {
    pageState: 4,
  };

  handleSubmit = () => {
    //console.log("SUbmitting...");
    //event.preventDefault();

    const users = {
      firstname: document.getElementById("field1").value,
      lastname: document.getElementById("field2").value,
      email: document.getElementById("field3").value,
      password: document.getElementById("field4").value,
    };
    console.log(users);

    axios.post(URL + "addNewUser", users).then((res) => {
      console.log(res.data);
      if (res.data.result == false) {
        console.log("Email ID taken");
        this.setState({ pageState: 2, message: "Email Id taken" });
      } else {
        this.setState({ data: res.data });
        this.setState({
          pageState: 3,
          message: "Account Created Successfully",
          email: document.getElementById("field3").value,
        });
        sessionStorage.setItem("loginSession", users.email);
      }
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
    console.log(this.state[event.target.id]);

    //console.log(this.state[event.target.id]);
  };

  handleSignIn = (event) => {
    event.preventDefault();
    const userData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    //console.log(userData);
    axios.post(URL + "signin", userData).then((res) => {
      console.log(res.data);
      if (res.data.result == false) {
        this.setState({
          pageState: 4,
          message: "Email or Password didn't match",
        });
      } else {
        this.setState({ pageState: 5, message: "Sign in Successfully" });
        sessionStorage.setItem("loginSession", userData.email); // Setting sesssion value to user's email
      }
    });
  };

  handleCreateButton = () => {
    this.setState({ pageState: 1 });
  };

  render() {
    return (
      <Container>
        {this.state.pageState === 1 ? (
          <Signup handleSubmit={this.handleSubmit} />
        ) : null}

        {this.state.pageState === 2 ? (
          <SignupUnsuccess
            message={this.state.message}
            handleSubmit={this.handleSubmit}
          />
        ) : null}

        {this.state.pageState === 3 ? (
          <SignupSuccess
            message={this.state.message}
            email={this.state.email}
            linkToItem={
              this.props.match.params.itemId
                ? this.props.match.params.itemId
                : null
            }
          />
        ) : null}
        {this.state.pageState === 4 ? (
          <SignIn
            onCreateButton={this.handleCreateButton}
            handleSignIn={this.handleSignIn}
            message={this.state.message}
          />
        ) : null}

        {this.state.pageState === 5 ? (
          <SignupSuccess
            message={this.state.message}
            linkToItem={
              this.props.match.params.itemId
                ? this.props.match.params.itemId
                : null
            }
          />
        ) : null}
      </Container>
    );
  }
}

export default withRouter(LoginSignup);

{
  /* <React.Fragment>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </React.Fragment> */
}
