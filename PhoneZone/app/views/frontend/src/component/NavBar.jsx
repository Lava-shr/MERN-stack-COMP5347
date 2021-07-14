import React, { useState, Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route } from "react-router-dom";
import {
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from "react-bootstrap";
import LoginSignup from "../LoginSignup";

class NavBar extends Component {
  state = {
    inputText: "",
    cartCount: 0,
  };

  componentDidMount() {
    if (sessionStorage.getItem("loginSession")) {
      this.setState({ signStatus: 1 });
    } else {
      this.setState({ signStatus: 0 });
    }
    let cartStr = sessionStorage.getItem("cart");
    if (cartStr) {
      let parsedCart = JSON.parse(cartStr);
      let size = Object.keys(parsedCart).length;
      this.setState({ cartCount: size });
    }
  }

  //   handleChange = (event) => {
  //     this.setState({ inputText: event.target.value });
  //     console.log(this.state.inputText);
  //   };

  handleSignOut = () => {
    let userSignOut = window.confirm("Are you sure you want to sign out?");
    if (!userSignOut) {
      return;
    }
    sessionStorage.removeItem("loginSession");
    sessionStorage.removeItem("cart");
    console.log("signed out", sessionStorage.getItem("loginSession"));
    this.setState({ signStatus: 0 });
  };

  render() {
    return (
      <Navbar bg="light" expand="lg" style={{ marginBottom: "60px" }}>
        <Navbar.Brand href="/">
          <img
            src="/images/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          Phone Zone
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              id="theSearchField"
            />
            <Button
              onClick={() =>
                this.props.onSearch(
                  document.getElementById("theSearchField").value
                )
              }
              variant="outline-dark"
              className="mr-sm-2"
            >
              Search
            </Button>

            {sessionStorage.getItem("loginSession") ? (
              <Link to="/userpage">
                <Button variant="outline-dark" className="mr-sm-2">
                  Profile
                </Button>
              </Link>
            ) : null}

            <Link to="/checkout">
              <Button variant="outline-dark" className="mr-sm-2">
                Check Out
                {this.state.cartCount > 0
                  ? " (" + this.state.cartCount + ")"
                  : null}
              </Button>
            </Link>

            {this.state.signStatus === 0 ? (
              <Link to="/loginsignup">
                <Button variant="outline-dark" className="mr-sm-2">
                  Sign In
                </Button>
              </Link>
            ) : (
              <Link to="/">
                <Button
                  onClick={() => this.handleSignOut()}
                  variant="outline-dark"
                  className="mr-sm-2"
                >
                  Sign Out
                </Button>
              </Link>
            )}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;

//   if (sessionStorage.getItem("loginSession")) {
//     console.log("user logged", sessionStorage.getItem("loginSession"));
//     //setUserlogin(true);
//   } else {
//     console.log("user not logged");
//   }
