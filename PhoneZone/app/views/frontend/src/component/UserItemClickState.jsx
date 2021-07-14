import React, { Component } from "react";

class UserItemClickState extends Component {
  state = {
    reviews: [],
  };
  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

  componentDidMount() {
    //let var1 = [...this.props.item.reviews];
    this.setState({ reviews: this.props.item.reviews });
  }

  onShowMore = (review) => {
    const index = this.state.reviews.indexOf(review);
    let copyReviews = [...this.state.reviews];

    copyReviews[index] = { ...copyReviews[index], displayFull: true };
    console.log("copyReviews", copyReviews[index]);

    this.setState({ reviews: copyReviews });
  };

  render() {
    const { item } = this.props;
    if (item.disabled){
      item.disbleOrEnable='Enable this' 
    }else {item.disbleOrEnable='Disable this'}
    
    return (
      <div>
        <button className="btn btn-secondary"  onClick={() => this.props.onBackButton()}>Back</button>
        <p>Title: {item.title}</p>
        <p>Brand: {item.brand}</p>
        <p>Stock: {item.stock}</p>
        <p>Seller name: {item.seller}</p>
        <p>Price: {item.price}</p>
        <p>Disable: {String(item.disabled)}</p>

        <button className="btn btn-secondary"  onClick={this.props.disableEnable.bind(this, item)} value={item}>{item.disbleOrEnable}</button>
        <br/><br />
        <button className="btn btn-secondary"  onClick={() => 
          {if(window.confirm('Are you sure you want to delete this item ?'))
          {this.props.deleteListing(item)}} }>Delete this listing
          </button>
        <h3>Reviews:</h3>

        {this.state.reviews.map((review) => (
          <div key={review._id}>
            <p>Reviewer: {review.reviewer}</p>
            <p>Rating: {review.rating}</p>
            {review.comment.length > 20 && !review.displayFull ? (
              <p>
                {review.comment.slice(0, 200)}
                <button className="btn btn-secondary"  onClick={() => this.onShowMore(review)}>
                  Show more
                </button>
              </p>
            ) : (
              review.comment
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default UserItemClickState;
