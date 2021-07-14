import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/LandingPage.css";
import UserProfile from "./component/UserProfile";
import axios from "axios";
import { Container } from "react-bootstrap";
import UserItemClickState from "./component/UserItemClickState";
import UserListingForm from "./component/UserListingForm";
import UserManageListing from "./component/UserManageListing";
import UserChangePasswordForm from "./component/UserChangePasswordForm";
import UserEditProfileForm from "./component/UserEditProfileForm";
import UserPasswordForm from "./component/UserPasswordForm";
import LandingPage from "./LandingPage";
import Checkout from "./Checkout";


import LoginSignup from "./LoginSignup";

const URL = "http://localhost:8000/";

class UserPage extends Component {
  state = {
    pageState: 1,
    currentItem: null,
    userId: "",
    fullName: "",
    firstName: "",
    lastName: "",
    email: "",
    passwordPromp: false,
  };
  // this gets users email id that's stored in session
  //console.log(sessionStorage.getItem("loginSession"));
  componentDidMount = () => {
    //sessionStorage.setItem("loginSession" , 'gail.patterson@hooli.com');
    console.log(sessionStorage.getItem("loginSession"));
    if (!sessionStorage.getItem("loginSession")) {
      this.setState({ pageState: 7 });
      return;
    }
    axios
      .get(URL + "getuserId", {
        params: { email: sessionStorage.getItem("loginSession") },
      })
      .then((res) => {
        let name = res.data.firstname + " " + res.data.lastname;
        this.setState({ userId: res.data._id });
        this.setState({ fullName: name });
        this.setState({ firstName: res.data.firstname });
        this.setState({ lastName: res.data.lastname });
        this.setState({ email: sessionStorage.getItem("loginSession") });
        sessionStorage.setItem("firstName", res.data.firstname);

        axios.get(URL + "getUserListings/" + this.state.userId).then((res) => {
          console.log(res.data);
          this.setState({ data: res.data });
        });
      });
    //axios.get(URL + 'getListing/60815fd466bc9c01c65e0f17') // 5f5237a4c1beb1523fa3dac4
    //axios.get(URL + 'getUserListings/' + userId)
    //console.log("user id1: ", this.state.fullName);
  };

  handleCardClick = (item) => {
    //console.log(item);
    this.setState({ pageState: 2, currentItem: item, profileUpdateMessage: "" });
  };

  handleBackButton = () => {
    this.setState({ pageState: 1 , passwordPromp: false, profileUpdateMessage: ""});
  };
  handleBackButtons = () => {
    this.setState({ pageState: 1, profileUpdateMessage: "" });
  };

  // Redirects to the edit profile form
  handleEditProfile = () => {
    this.setState({
      pageState: 6,
      message: "Leave empty if you don't want to update",
    });
    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
    };
    this.setState({ userData: userData });
  };

  // Checks password before update profile
  handleUpdateProfilePasswordCheck = (event) => {
    event.preventDefault();
    this.setState({passwordPromp: true, passwordMessage:"Please enter password here", pageState: 6});

  }

  // Updated the profile update to DB
  handleUpdateProfile = (event) => {
    event.preventDefault();
    console.log("Update profile here");
    let newFirstName = document.getElementById("firstName").value;
    let newLastName = document.getElementById("lastName").value;
    let newEmail = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    //console.log(password);
    // this.setState({passwordPromp: true, passwordMessage:"Please enter password here"});
    // alert("Please insert the password in the box.")
    // const passwordPrompt = prompt("Please enter password");

    // let password = passwordPrompt;
    const userData = {
      email: sessionStorage.getItem("loginSession"),
      password: password,
    };
    //console.log(userData)
    axios.post(URL + "signin", userData).then((res) => {
      if (res.data.result == false) {
        this.setState({
          pageState: 6,
          message: "Your Old Password was incorrect",
          passwordPrompt: password,
          passwordPromp: false
        });
        return;
      } else {
        if (newFirstName?.trim()) {
          // ignore if string is empty or white spaces:https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces/50971250
          const newUserData = {
            email: sessionStorage.getItem("loginSession"),
            firstname: newFirstName,
          };
          axios.patch(URL + "changeFirstName", newUserData);
          this.setState({ firstName: newFirstName });
          this.setState({profileUpdateMessage: "Profile updated"})
        }

        if (newLastName?.trim()) {
          const newUserData = {
            email: sessionStorage.getItem("loginSession"),
            lastname: newLastName,
          };
          axios.patch(URL + "changeLastName", newUserData);
          this.setState({ lastName: newLastName });
          this.setState({profileUpdateMessage: "Profile updated"})
        }

        if (newEmail?.trim()) {
          const newUserData = {
            email: sessionStorage.getItem("loginSession"),
            newemail: newEmail,
          };

          axios.patch(URL + "changeEmail", newUserData).then((res) => {
            //console.log(res.data);
            if (!res.data.result) {
              alert("Email id not updated. Email Id taken");
            } else{
              sessionStorage.setItem("loginSession", newEmail);
              this.setState({email: newEmail})
              this.setState({profileUpdateMessage: "Profile updated"})
            }
          });
        }
        //console.log(this.state.firstName);
        //console.log(this.state.lastName);
        let fullName = this.state.firstName + " " + this.state.lastName;
        this.setState({ 
          pageState: 1 , 
          passwordPromp: false,
          fullName: fullName
        });
      }
    });
  };
  // Redirects to the password change page
  handleChangePassword = () => {
    this.setState({ pageState: 5, message: "", profileUpdateMessage: "" });
  };

  // Update password to DB
  // but needs yes no prompt
  handleUpdatePassword = (event) => {
    event.preventDefault();
    let passwordUpdateConfirm = window.confirm("Update the password");
    if (!passwordUpdateConfirm) {
      this.setState({ pageState: 5, message: "Password not updated" , profileUpdateMessage: ""});
      return;
    }
    

    //console.log("Updating Password to DB");
    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    //console.log(oldPassword, newPassword);
    //console.log(sessionStorage.getItem("loginSession"));

    const userData = {
      email: sessionStorage.getItem("loginSession"),
      password: oldPassword,
    };
    axios.post(URL + "signin", userData).then((res) => {
      if (res.data.result == false) {
        this.setState({
          pageState: 5,
          message: "Your Old Password was incorrect",
        });
      } else {
        const newUserData = {
          email: sessionStorage.getItem("loginSession"),
          password: newPassword,
        };
        axios.patch(URL + "changepassword", newUserData).then((res) => {
          this.setState({ pageState: 5, message: "Password Updated" });
        });
      }
    });
  };

  handleManageListing = () => {
    axios.get(URL + "getUserListings/" + this.state.userId).then((res) => {
      //console.log(res.data);
      this.setState({ pageState: 4, data: res.data, profileUpdateMessage: "" });
    });
  };

  // Redirects to add listing page
  handleAddListing = () => {
    this.setState({ pageState: 3, message: "Please fill all the data here" , profileUpdateMessage: "" });
  };

  // Deletes the listing
  handleDeleteListing = (item) => {
    //console.log(item);
    const listingId = item._id;
    //axios.delete('http://localhost:8000/deletelisting/609602d65c511906d39a7b86')
    axios.delete(URL + "deletelisting/" + listingId).then((res) => {
      axios.get(URL + "getUserListings/" + this.state.userId).then((res) => {
        console.log(res.data);
        this.setState({ pageState: 1, data: res.data, profileUpdateMessage: "" });
      });
    });
  };
  // Add listing to DB
  handleListing = (event) => {
    event.preventDefault();
    let stock = parseInt(document.getElementById("stock").value);
    let price = parseFloat(document.getElementById("price").value);
    let disabled = false;
    if (document.getElementById("disable").value === "yes") {
      disabled = true;
    }
    //console.log(document.getElementById("disable").value);
    let sellerId = this.state.userId;
    const listing = {
      title: document.getElementById("title").value,
      brand: document.getElementById("brand").value,
      image: document.getElementById("brand").value,
      stock: stock,
      sellerId: sellerId,
      price: price,
      reviews: [],
      disabled: disabled,
    };
    //console.log("user id: ", this.state.userId);
    axios.post(URL + "addlisting", listing);
    this.setState({ pageState: 3, message: "Listing Added", profileUpdateMessage: "" });
  };

  // Handles disable and Enable
  handleEnableDisableListing = (item) => {
    if (item.disabled) {
      // Enable item api call
      axios.patch(URL + "enablelisting/" + item._id).then((res) => {
        axios.get(URL + "getListing/" + item._id).then((res) => {
          this.setState({ pageState: 2, currentItem: res.data, profileUpdateMessage: "" });
        });
      });
    } else {
      // Disable item api call
      axios.patch(URL + "disablelisting/" + item._id).then((res) => {
        axios.get(URL + "getListing/" + item._id).then((res) => {
          this.setState({ pageState: 2, currentItem: res.data, profileUpdateMessage: "" });
        });
      });
    }
  };

  // handles signout
  handleSignOut = () => {
    let userSignOut = window.confirm("Are you sure you want to sign out?");
    if (!userSignOut) {
      return;
    } else {
      sessionStorage.removeItem("loginSession");
      sessionStorage.removeItem("cart");
      console.log("signed out", sessionStorage.getItem("loginSession"));
      sessionStorage.removeItem("cart");
      this.setState({ pageState: 7 });
    }
  };

  render() {
    return (
      <Container>
        {this.state.pageState === 1 ? (
          <UserProfile
            fullName={this.state.fullName}
            editProfile={this.handleEditProfile}
            changePassword={this.handleChangePassword}
            manageListing={this.handleManageListing}
            signOut={this.handleSignOut}
            profileUpdateMessage= {this.state.profileUpdateMessage}
          />
        ) : null}

        {this.state.pageState === 2 ? (
          <UserItemClickState
            item={this.state.currentItem}
            onBackButton={this.handleManageListing}
            disableEnable={this.handleEnableDisableListing}
            deleteListing={this.handleDeleteListing}
            signOut={this.handleSignOut}
          />
        ) : null}

        {this.state.pageState === 3 ? (
          <UserListingForm
            message={this.state.message}
            onBackButton={this.handleBackButton}
            handleListing={this.handleListing}
            signOut={this.handleSignOut}
          />
        ) : null}

        {this.state.pageState === 4 ? (
          <UserManageListing
            data={this.state.data}
            onCardClick={this.handleCardClick}
            onBackButton={this.handleBackButton}
            addListing={this.handleAddListing}
            signOut={this.handleSignOut}
          />
        ) : null}

        {this.state.pageState === 5 ? (
          <UserChangePasswordForm
            message={this.state.message}
            onBackButton={this.handleBackButton}
            updatePassword={this.handleUpdatePassword}
            signOut={this.handleSignOut}
          />
        ) : null}

        {this.state.pageState === 6 ? (
          <UserEditProfileForm
            message={this.state.message}
            userData={this.state.userData}
            onBackButton={this.handleBackButton}
            updateProfile={this.handleUpdateProfilePasswordCheck}
            signOut={this.handleSignOut}
          />
        ) : null}

        {this.state.passwordPromp ? (
          <UserPasswordForm
          message={this.state.passwordMessage}
          updateProfile={this.handleUpdateProfile}
          />
        ) : null}

        {this.state.pageState === 7 ? <LandingPage /> : null}
        <div style={{marginBottom:"150px"}}></div>
      </Container>
    );
  }
}

export default UserPage;
