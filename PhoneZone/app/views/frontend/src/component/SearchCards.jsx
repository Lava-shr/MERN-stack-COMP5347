import React, { Component, useEffect, useState } from "react";
import {
  Button,
  CardDeck,
  Card,
  Container,
  Row,
  Dropdown,
} from "react-bootstrap";
import PhoneCard from "./PhoneCard";
import { getFive } from "../FakePhoneListing";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

//class Cards extends Component {
//state = {
//  fiveItems: getFive(),
//};
// render() {
//  console.log(this.state.fiveItems[0].brand);

function SearchCards(props) {
  const maxPrice = 2000;
  console.log(maxPrice);
  const [uniquebrand, setUniquebrand] = useState([]);
  const [value, setValue] = useState(maxPrice);
  console.log(value);
  const [selectedBrand, setSelectedBrand] = useState("");
  const priceChanged = (val) => {
    setValue(val);
    console.log(val);
  };

  const dropDownOnChange = (brand) => {
    //console.log(brand);
    setSelectedBrand(brand);
  };

  const showAllProducts = () => {
    //console.log(props);
    return props.data?.map((item) => {
      if (item.price <= value) {
        console.log(value);
        return (
          <PhoneCard onClick={props.onCardClick} item={item} key={item._id} />
        );
      }
    });
  };

  const showSomeProducts = () => {
    //console.log(props);
    return props.data?.map((item) => {
      if (item.price <= value && item.brand === selectedBrand) {
        return (
          <PhoneCard onClick={props.onCardClick} item={item} key={item._id} />
        );
      }
    });
  };

  useEffect(() => {
    console.log("Props", props);
    let temp = [];
    props.data?.map((d) => {
      if (temp.indexOf(d.brand) == -1) {
        temp.push(d.brand);
      }
    });
    // props.data4?.map((d)=>{
    //   if(temp.indexOf(d.brand)==-1)
    //   {
    //       temp.push(d.brand);
    //   }
    // });

    setUniquebrand(temp);
  }, []);
  return (
    <Container>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select a brand
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {uniquebrand.map((brand) => {
            return (
              <Dropdown.Item
                onClick={() => {
                  dropDownOnChange(brand);
                }}
              >
                {brand}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <h3>Price filter</h3>
      <RangeSlider
        value={value}
        max={maxPrice}
        onChange={(changeEvent) => priceChanged(changeEvent.target.value)}
      />
      <h2>Search Results </h2>
      <br />

      <Row>
        {
          //selectedBrand ? "Selected" : "Not selected"
          selectedBrand ? showSomeProducts() : showAllProducts()
        }
        {showAllProducts()}
      </Row>
    </Container>
  );
}

//}
//}

export default SearchCards;
