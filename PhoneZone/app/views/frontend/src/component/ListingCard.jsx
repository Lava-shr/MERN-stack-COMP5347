import React, { Component } from "react";
import { Card, CardDeck, Col } from "react-bootstrap";

const ListingCard = (props) => {
  return (
    <Col style={{ margin: "20px 0" }}>
      <Card
        onClick={() => props.onClick(props.item)}
        style={{ width: "18rem" , padding: "15px"}}
      >
        <Card.Img variant="top" src={`/images/${props.item?.brand}.jpeg`} />
        <Card.Body>
          <br />
          <Card.Text style={{fontSize:"1.5rem"}}>Price <span style={{fontWeight:"bold"}}>${props.item?.price}</span></Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ListingCard;
