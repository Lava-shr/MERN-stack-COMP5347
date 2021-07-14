import React, { Component } from "react";
import { Button, CardDeck, Card, Container, Row } from "react-bootstrap";


function SignupUnsuccess(props) {
  
  return (
<>
  <form className="signInForm" action="">
              <h3 className="text-center">Sign Up</h3>
              <br/>
              <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" placeholder="Enter Name" id="field1"/>
              </div>
              <div className="form-group">
                  <label>Surname</label>
                  <input type="text" className="form-control" placeholder="Enter Surname" id="field2"/>
              </div>

              <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" placeholder="Enter email" id="field3"/>
              </div>

              <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Enter password" id="field4"/>
              </div>
              <button className="btn btn-dark" onClick={props.handleSubmit}>Sign Up</button>
          </form>



  <h3>{props.message}</h3>
  <h3>Please try again<br></br></h3>
  </>
  );
}

//}
//}

export default SignupUnsuccess;
