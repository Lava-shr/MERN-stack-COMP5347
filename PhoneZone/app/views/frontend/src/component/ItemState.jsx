import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ItemState.css";

//----- This Component is Item state where Item information is displayed
class ItemState extends Component {
  state = {
    reviews: [],
    showReviews: 3,
  };

  componentDidMount() {
    //let var1 = [...this.props.item.reviews];
    this.setState({ reviews: this.props.item.reviews });
    //console.log("propsssss", this.props.item);
  }

  onShowMore = (review) => {
    // Expand reviews that limited by 200 characters limit
    const index = this.state.reviews.indexOf(review);
    let copyReviews = [...this.state.reviews];

    copyReviews[index] = { ...copyReviews[index], displayFull: true };
    //console.log("copyReviews", copyReviews[index]);

    this.setState({ reviews: copyReviews });
  };

  addToCart = () => {
    // Adds item to cart
    let quantity = document.getElementById("quantity").value;
    if (sessionStorage.getItem("cart")) {
      // Cart exists, add new item to this cart
      let cartStr = sessionStorage.getItem("cart");
      let parsedCart = JSON.parse(cartStr);
      let size = Object.keys(parsedCart).length + 1;

      let newParsedCart = {
        ...parsedCart,
        [size]: { ...this.props.item, quantity: quantity },
      };
      cartStr = JSON.stringify(newParsedCart);
      sessionStorage.setItem("cart", cartStr);
    } else {
      // Creating new cart
      let newCartObj = { 1: { ...this.props.item, quantity: quantity } };
      let cartStr = JSON.stringify(newCartObj);
      sessionStorage.setItem("cart", cartStr);
    }
  };

  handleShowMoreComments = () => {
    // Show 3 more comments
    let num = 3;
    num += this.state.showReviews;
    this.setState({ showReviews: num });
  };

  RenderAddButton = () => {
    if (this.props.item.stock < 1) {
      return <p>Out of stock</p>;
    }

    //If stock is over 5 then quantiry drop-down menu limited to 5
    let stock = this.props.item.stock > 5 ? 5 : this.props.item.stock;
    console.log("Stock:", this.props.item.stock);

    let stockArr = [];
    for (let i = 1; i < stock + 1; i++) {
      console.log("pushing", i);
      stockArr.push(i);
    }

    return (
      <div>
        <button
          className="btn btn-secondary"
          style={{ marginRight: "20px" }}
          onClick={() => this.addToCart()}
        >
          Add to Cart
        </button>
        Quantity:
        <select name="quantity" id="quantity">
          {stockArr.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  };

  render() {
    const { item } = this.props;
    return (
      <div>
        <button
          className="btn btn-dark"
          onClick={() => this.props.onBackButton()}
        >
          {"< Back"}
        </button>
        <br />
        <br />
        <div className="flexboxContainer">
          <div>
            <img
              alt="Phone picture"
              className="itemImage"
              style={{ width: "250px", height: "250px" }}
              src={`/images/${item.brand}.jpeg`}
            />
          </div>
          <div>
            <p>
              <span style={{ fontWeight: "bold" }}>Title: </span>
              {item.title}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Brand: </span>
              {item.brand}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Stock: </span>
              {item.stock}
            </p>

            <p>
              <span style={{ fontWeight: "bold" }}>Seller name: </span>
              {item.seller}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Price:</span>{" "}
              <span style={{ color: "red" }}>$ {item.price}</span>
            </p>
            {sessionStorage.getItem("loginSession") ? (
              <this.RenderAddButton />
            ) : (
              <div>
                <Link to={"loginsignup/" + item._id}>
                  <button className="btn btn-dark">
                    Sign In to add to Cart
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        {this.state.reviews.length > 0 ? (
          <h3 style={{ marginTop: "20px" }}>Reviews:</h3>
        ) : null}
        {this.state.reviews.map((review, i) =>
          this.state.showReviews > i ? (
            <div key={review._id}>
              <p> <span style={{fontWeight:"bold"}}>Reviewer:</span>{review.reviewer}</p>
              <p> <span style={{fontWeight:"bold"}}>Rating: </span> {review.rating}</p>
              {review.comment.length > 200 && !review.displayFull ? (
                <p>
                  {review.comment.slice(0, 200)}
                  <button
                    className="btn btn-link"
                    onClick={() => this.onShowMore(review)}
                  >
                    Show more
                  </button>
                </p>
              ) : (
                review.comment
              )}
            </div>
          ) : null
        )}
        {this.state.showReviews < this.state.reviews.length ? (
          <button
            className="btn btn-secondary"
            onClick={() => this.handleShowMoreComments()}
          >
            More reviews
          </button>
        ) : null}
        <div style={{marginBottom:"150px"}}></div>
      </div>
    );
  }
}

export default ItemState;
