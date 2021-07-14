import React, { Component } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import axios from "axios";
const URL = "http://localhost:8000/";

class Checkout extends Component {
  state = {
    cart: [],
    totalPrice: 0,
    quantityError: [],
    checkoutError: "",
  };

  componentDidMount() {
    let cartStr = sessionStorage.getItem("cart");
    if (cartStr) {
      let totalPrice = 0;
      let parsedCart = JSON.parse(cartStr);
      let size = Object.keys(parsedCart).length;
      let items = [];
      let quantityError = [];
      let ids = [];
      for (let i = 1; i <= size; i++) {
        totalPrice += parsedCart[i].price * parsedCart[i].quantity; //Get total price
        let indexof1 = ids.indexOf(parsedCart[i]._id); ////
        //console.log("Index of: ", indexof1); /////
        if (ids.indexOf(parsedCart[i]._id) !== -1) {
          let num1 = parseInt(items[indexof1].quantity);
          let num2 = parseInt(parsedCart[i].quantity);
          items[indexof1].quantity = num1 + num2;
          //console.log(indexof1, parsedCart[i]);
          continue;
        }
        items.push(parsedCart[i]);
        ids.push(parsedCart[i]._id);
        //console.log(ids);
        quantityError.push("");
      }
      totalPrice = totalPrice.toFixed(2);
      this.setState({ cart: items, totalPrice, quantityError });
    }
  }

  getTotalPrice = () => {
    let totalPrice = 0;
    let size = Object.keys(this.state.cart).length;
    for (let i = 0; i < size; i++) {
      totalPrice += this.state.cart[i].price * this.state.cart[i].quantity;
    }
    console.log("total price recalculated:", totalPrice);
    return totalPrice;
  };

  emptyCart = () => {
    sessionStorage.removeItem("cart");
  };

  renderItems = () => {
    //console.log("Render Items:", this.state.items);
    //return items.map((m) => <p>helo</p>);
  };

  handleChangeQuantity = (item, index) => {
    let newQuantity = parseInt(
      document.getElementById("quantity" + index).value
    );

    let cart = [];
    let totalPrice = 0;

    if (newQuantity || newQuantity === 0) {
      if (newQuantity === 0) {
        console.log("its zero");

        for (let i = 0; i < this.state.cart.length; i++) {
          if (i !== index) {
            cart.push(this.state.cart[i]);
            totalPrice +=
              this.state.cart[i].price * this.state.cart[i].quantity;
          }
        }

        totalPrice = totalPrice.toFixed(2);
        console.log("Item removed", totalPrice, cart);
        this.setState({ cart, totalPrice });
      } else if (newQuantity > item.stock) {
        let errorMsg = "Low stock";
        let quantityError = [...this.state.quantityError];
        quantityError[index] = errorMsg;
        this.setState({ quantityError });
      } else {
        let cart = [...this.state.cart];
        cart[index].quantity = newQuantity;
        ////////
        let errorMsg = "";
        let quantityError = [...this.state.quantityError];
        quantityError[index] = errorMsg;
        this.setState({ quantityError, cart });
      }
    } else {
      console.log(false);
    }
  };

  handleUpdateCart = () => {
    let size = this.state.cart.length;
    if (size >= 1) {
      let newCartObj = { 1: { ...this.state.cart[0] } };
      for (let i = 2; i < size + 1; i++) {
        newCartObj = { ...newCartObj, [i]: { ...this.state.cart[i - 1] } };
      }
      console.log(newCartObj);
      let cartStr = JSON.stringify(newCartObj);
      sessionStorage.setItem("cart", cartStr);
      console.log("Cart updated", newCartObj);
    } else {
      sessionStorage.removeItem("cart");
    }
  };

  handleRemoveItem = (index) => {
    let cart = [];
    let totalPrice = 0;
    for (let i = 0; i < this.state.cart.length; i++) {
      if (i !== index) {
        cart.push(this.state.cart[i]);
        totalPrice += this.state.cart[i].price * this.state.cart[i].quantity;
      }
    }
    totalPrice = totalPrice.toFixed(2);
    console.log("Item deleted", totalPrice, cart);
    this.setState({ cart, totalPrice });
  };

  handleCheckout = () => {
    let clearToSubmit = true;
    for (let i = 0; i < this.state.cart.length; i++) {
      let cartNum = parseInt(this.state.cart[i].quantity);
      let stockNum = parseInt(this.state.cart[i].stock);
      console.log("Cart :", typeof cartNum);
      console.log("warehouse: ", typeof stockNum);
      if (cartNum > stockNum) {
        let errorMessage =
          "Not enough stock for Item: " + this.state.cart[i].title;
        clearToSubmit = false;
        this.setState({ checkoutError: errorMessage });
      }
    }

    if (clearToSubmit) {
      // removes item from the cart.
      axios.post(URL + "checkout", this.state.cart);
      sessionStorage.removeItem("cart");
      this.props.history.push("/");
    }
  };

  render() {
    let { cart, totalPrice } = this.state;
    return (
      <React.Fragment>
        <br />
        <br />
        <button
          className="btn btn-secondary"
          style={{ marginRight: "10px" }}
          onClick={this.props.history.goBack}
        >
          Back
        </button>
        <button className="btn btn-secondary" onClick={() => this.emptyCart()}>
          Wipe cart
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleUpdateCart()}
                >
                  Update cart
                </button>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>
                  <input
                    type="text"
                    placeholder={item.quantity}
                    className="mr-sm-2"
                    id={"quantity" + i}
                    name={"quantity" + i}
                  />
                  <label htmlFor={"quantity" + i}>
                    {this.state.quantityError[i]}
                  </label>
                </td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.handleChangeQuantity(item, i)}
                  >
                    Change
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.handleRemoveItem(i)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Total price: ${totalPrice}{" "}
          <button
            className="btn btn-danger"
            onClick={() => this.handleCheckout()}
            id="checkoutbtn"
          >
            Checkout
          </button>
          <br />
          <label htmlFor="checkoutbtn">{this.state.checkoutError}</label>
        </p>
      </React.Fragment>
    );
  }
}

export default withRouter(Checkout);
