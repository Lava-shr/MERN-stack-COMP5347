import React from "react";
import NavBar from "./NavBar";
import './signIn.css';

const SignIn = (props) => {
  return (
    <>
    <form className="signInForm" action="">
                <h3 className="text-center">Sign In</h3>
                <br/>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" id="email"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" id="password"/>
                </div>
                <button className="btn btn-dark" onClick={props.handleSignIn}>Log in</button>
                <p>
                  <h3>{props.message}</h3>
                    New user?
                 <button className="btn btn-link" onClick={props.onCreateButton}>Create new account</button>
                 </p>
            </form>
            </>

  );
};

export default SignIn;
