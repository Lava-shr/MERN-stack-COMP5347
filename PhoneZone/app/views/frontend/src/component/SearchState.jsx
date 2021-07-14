import React, { Component } from "react";
import SearchCards from "../component/SearchCards";
import SearchResultState from "../component/SearchResultState";
import axios from "axios";
import { Container } from "react-bootstrap";
import NavBar from "../component/NavBar";
import SearchTools from "./SearchTools";
import { Row, Dropdown, DropdownButton } from "react-bootstrap";
import PhoneCard from "./PhoneCard";
//import SearchCards from "../component/SearchCards"


class SearchState extends Component {
  state = {
    pageState: 1,
    searchText: "",
    uniquebrand: [],
    value: 200,
    selectedBrand: "",
    buttonTitle: "Select Brand",
  };

  //({ reviews: this.props.item.reviews });
  componentDidMount() {
    axios
      .get("http://localhost:8000/getSearchTitle", {
        params: { searchText: this.props.search },
      })
      .then((res) => {
        let maxValue = this.findMaxValueFromSearchResult(res.data);

        let temp = [];
        res.data?.map((d) => {
          if (temp.indexOf(d.brand) == -1) {
            temp.push(d.brand);
          }
        });
        this.setState({ uniquebrand: temp });

        this.setState({
          uniquebrand: temp,
          data: res.data,
          searchText: this.props.search,
          maxValue: maxValue,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.search !== prevState.searchText) {
      axios
        .get("http://localhost:8000/getSearchTitle", {
          params: { searchText: this.props.search },
        })
        .then((res) => {
          let maxValue = this.findMaxValueFromSearchResult(res.data);
          this.setState({
            data: res.data,
            maxValue: maxValue,
            searchText: this.props.search,
            selectedBrand: "",
            buttonTitle:"Select Brand"
          });
          //console.log(res.data);
        });
      }
      this.renderDropDown();
  }

  // Returing max value from the search results for the slider.Adding 100
  findMaxValueFromSearchResult(results) {
    let max = results[0].price;
    for (let i = 1; i < results.length; ++i) {
      let temp = results[i].price;
      if (temp > max) {
        max = temp;
      }
    }
    return max + 100;
  }

  handleCardClick = (item) => {
    console.log("reached here");
    this.setState({ pageState: 2, currentItem: item });
  };

  getBrands = () => {};

  handleBackButton = () => {
    this.setState({ pageState: 1 });
  };

  dropDownOnChange = (brand) => {
    this.setState({ selectedBrand: brand });
    this.setState({ buttonTitle: brand });
  };

  showAllProducts = () => {
    return this.state.data?.map((item) => {
      if (item.price <= this.state.value) {
        return (
          <PhoneCard
            onClick={this.handleCardClick}
            item={item}
            key={item._id}
          />
        );
      }
    });
  };

  showSomeProducts = () => {
    return this.state.data?.map((item) => {
      if (
        item.price <= this.state.value &&
        item.brand === this.state.selectedBrand
      ) {
        return (
          <PhoneCard
            onClick={this.handleCardClick}
            item={item}
            key={item._id}
          />
        );
      }
    });
  };

  renderDropDown = () => {
    return (
      <DropdownButton id="dropdown-basic-button" title={this.state.buttonTitle}>
        {this.state.uniquebrand.map((brand) => (
          <Dropdown.Item
            onClick={() => {
              this.dropDownOnChange(brand);
            }}
          >
            {brand}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  };

  render() {
    return (
      <Container>
        {console.log("before searchcard:", this.state.uniquebrand)}
        
        {this.state.pageState === 1 ? (
          <div>
            <this.renderDropDown />
            <Row>
              {this.state.selectedBrand
                ? this.showSomeProducts()
                : this.showAllProducts()}
            </Row>
          </div>
        ) : null}

        {this.state.pageState === 2 ? (
          <SearchResultState
            item={this.state.currentItem}
            onBackButton={this.handleBackButton}
            maxValue={this.state.maxValue}
          />
        ) : null}

        <div style={{marginBottom:"150px"}}></div>
      </Container>
    );
  }
}

export default SearchState;

{
  /* <SearchCards
data={this.state.data}
onCardClick={this.handleCardClick}
maxValue={this.state.maxValue}
/> */
}
