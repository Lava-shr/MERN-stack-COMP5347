
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import LandingPage from './LandingPage';
import TestPage from './TestPage';
import LoginSignup from './LoginSignup';
import UserPage from './UserPage';
import Checkout from './Checkout';
import Footer from './component/Footer';


function App() {

  return (
    <Container>
      <Router>
        <Switch>
{/* 
          <Route path="/submitform">
            <SignUpForm />
          </Route> */}
          <Route path="/testpage">
              <TestPage />
          </Route>
          <Route path="/checkout">
              <Checkout />
          </Route>
          <Route path="/loginsignup/:itemId">
              <LoginSignup />
          </Route>
          <Route path="/loginsignup">
              <LoginSignup />
          </Route>

          <Route path="/userPage">
              <UserPage />
          </Route>

          <Route path="/:itemId">
            <LandingPage />
          </Route>

          <Route path="/">
            <LandingPage />
          </Route>
          
          

        </Switch>
      </Router>
      <Footer/>
    </Container >
  );
}
export default App;

