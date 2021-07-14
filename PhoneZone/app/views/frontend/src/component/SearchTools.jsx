import React, { Component } from "react";

class SearchTools extends Component {
  state = {};

  componentDidMount() {
    console.log("Search tools", this.props);
  }

  render() {
    return <p>Component mounted</p>;
  }
}

export default SearchTools;
