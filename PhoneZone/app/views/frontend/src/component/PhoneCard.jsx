import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardDeck, Col } from "react-bootstrap";
//------- This is a Component to display a phone in a card element
const PhoneCard = (props) => {
  return (
    <Col style={{ margin: "100px 0" }}>
      <Link to={"/" + props.item._id}>
        <Card
          onClick={() => props.onClick(props.item)}
          style={{ width: "18rem", padding: "15px" }}
        >
          <Card.Img variant="top" src={`/images/${props.item?.brand}.jpeg`} />
          <Card.Body>
            <br />
            <Card.Text style={{ fontSize: "1.5rem" }}>
              Price{" "}
              <span style={{ fontWeight: "bold" }}>${props.item?.price}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default PhoneCard;
