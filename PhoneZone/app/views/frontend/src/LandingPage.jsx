import React, { Component } from "react";
import { withRouter } from "react-router";
import "./css/LandingPage.css";
import Cards from "./component/Cards";
import axios from "axios";
import { Container } from "react-bootstrap";
import ItemState from "./component/ItemState";
import SearchState from "./component/SearchState";
import NavBar from "./component/NavBar";

class LandingPage extends Component {
  // This is Landing page that has 3 states depending on context
  state = {
    pageState: 1,
    currentItem: null,
  };

  componentDidMount = () => {
    axios.get(`http://localhost:8000/soldoutsoon`).then((res) => {
      this.setState({ data: res.data });
    });
    axios.get(`http://localhost:8000/bestsellers`).then((res) => {
      this.setState({ data2: res.data });
    });

    if (this.props.match.params.itemId) {
      axios
        .get(
          `http://localhost:8000/getListing/${this.props.match.params.itemId}`
        )
        .then((res) => {
          this.setState({ listing: res.data, pageState: 4 });
        });
    }
  };

  handleCardClick = (item) => {
    //Original method to go view item
    this.setState({ pageState: 2, currentItem: item });
  };

  handleBackButton = () => {
    this.setState({ pageState: 1 });
  };

  handleSearch = (text1) => {
    this.setState({ pageState: 3, text: text1 });
  };

  render() {
    // Page will be conditionalty renedered depending on pageState variable
    // pageState: 1 - Main state with best sellers and sold out soon
    // pageState: 4 - Item state
    // pageState: 3 - Search state
    return (
      <Container>
        <NavBar onSearch={this.handleSearch} />

        {this.state.pageState === 1 ? (
          <Cards
            data={this.state.data}
            data2={this.state.data2}
            onCardClick={this.handleCardClick}
          />
        ) : null}
        {this.state.pageState === 2 ? (
          <ItemState
            item={this.state.currentItem}
            onBackButton={this.handleBackButton}
          />
        ) : null}
        {this.state.pageState === 3 ? (
          <SearchState
            state={this.state}
            search={this.state.text}
            data={this.state.data}
            // data3={this.state.data2}
            // data4={this.state.listing}
          />
        ) : null}

        {this.state.pageState === 4 ? (
          <ItemState
            item={this.state.listing}
            onBackButton={this.handleBackButton}
          />
        ) : null}
      </Container>
    );
  }
}

export default withRouter(LandingPage);
