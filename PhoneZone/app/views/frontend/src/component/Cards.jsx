import React, { Component } from "react";
import { Button, CardDeck, Card, Container, Row } from "react-bootstrap";
import PhoneCard from "./PhoneCard";
import { getFive } from "../FakePhoneListing";

//class Cards extends Component {
//state = {
//  fiveItems: getFive(),
//};
// render() {
//  console.log(this.state.fiveItems[0].brand);

function Cards(props) {
  return (
    <Container>
      <h2>Sold Out Soon </h2>
      <br />
      <Row>
        {props.data?.map((item) => (
          <PhoneCard onClick={props.onCardClick} item={item} key={item._id} />
        ))}
      </Row>
      <h2>Best Seller </h2>
      <Row>
        {props.data2?.map((item) => (
          <PhoneCard onClick={props.onCardClick} item={item} key={item._id} />
        ))}
      </Row>
      <br />
    </Container>
  );
}

//}
//}

export default Cards;
