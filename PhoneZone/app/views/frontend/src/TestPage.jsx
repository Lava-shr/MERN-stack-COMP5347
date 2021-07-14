import React, { Component } from "react";
import "./css/LandingPage.css";
import axios from "axios";
const URL = 'http://localhost:8000/'


// test page to interact with Backend
class TestPage extends Component {
  componentDidMount = () => {
    // const article = [ { id: '60815fd466bc9c01c65e0f18', stock: 1 },
    //                   { id: '60815fd466bc9c01c65e0ef6', stock: 1 }
    //                 ]
    // axios.post('http://localhost:8000/checkout', article)
    //5f5237a4c1beb1523fa3da39
                  
    // axios.get('http://localhost:8000/getUserListings/5f5237a4c1beb1523fa3da39')
    //   .then((res) => {
    //       console.log(res.data);
    //       this.setState({ data: res.data });
    //     });
    // Posting listing
    // const listing = {
    //           title: "Samsung A777- Blue",
    //           brand: "Samsung",
    //           image: "image",
    //           stock: 100,
    //           sellerId: "5f5237a4c1beb1523fa3da39",
    //           price: 59.99,
    //           reviews: [],
    //           disabled: false
    //           }
    // axios.post('http://localhost:8000/addlisting', listing)
    // .then((res) => {
    //   console.log(res.data);
    // })
    // delete this id 609602d65c511906d39a7b86
    //const listing = {id:'609602d65c511906d39a7b86'};
    //axios.delete('http://localhost:8000/deletelisting/609602d65c511906d39a7b86')
    // 6095ff6d55acfd0611730d77
    //axios.patch('http://localhost:8000/disablelisting/6095ff6d55acfd0611730d77') // turns disble to true
    //axios.patch('http://localhost:8000/enablelisting/6095ff6d55acfd0611730d77') // turns disble to false

    // axios.get('http://localhost:8000/getSearchTitle', {params:{searchText:"samsung"}})
    // .then((res) => {
    //   console.log(res.data);
    //   this.setState({ data: res.data });
    // });

  //   const users = {
  //     firstname:'sdf',
  //     lastname: 'asdf',
  //     email: 'aasdfa',
  //     password: 'asdfasdf'
  // }
  // axios.post('http://localhost:8000/addNewUser', users);
  
    //axios.get( URL + 'getUserFullName', {params:{id:"5f5237a4c1beb1523fa3da02"}});
    //axios.get( "http://localhost:8000/getUserFullName", {params:{id:"5f5237a4c1beb1523fa3da02"}});
    // axios.get(URL + 'getuserId', {params: {email:'rolmol3@gmail.com'}})
    // .then((res) => {
    //   console.log(res.data);
    // });
    // listing id: 60815fd466bc9c01c65e0f17

    // get item api to the listing for the given seller id.
    // axios.get(URL + 'getUserListings/5f5237a4c1beb1523fa3dac4')
    // .then((res) => {
    //   console.log(res.data);
    // });

// Use public url.

  };  

  render() {
    return (<div><p>For testing</p></div>);
  }
}

export default TestPage;
