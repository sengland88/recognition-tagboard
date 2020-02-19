import React, { Component } from "react";
import { Link } from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Nav from "../../components/Nav";
import Jumbotron from "../../components/Jumbotron";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Row from "../../components/Row";
import Col from "../../components/Col";
import API from "../../utils/API";
import "./tagboard.css";

class Tagboard extends Component {
  render() {
    return (
      <div className="container">
        <Container>
          <Title>This is the tagboard</Title>
          <Row>
            {/* // will need to map over employee comments that match the current department being featured */}
            <Col size="sm">this is where the picture, employees name, department and employee start date will go</Col>

          </Row>
          <Row>
            <Col size="sm">
              <Link to="/welcome">Welcome</Link>
              <Link to="/tagboard">Tagboard</Link>
              <Link to="/search">Search</Link>
              <Link to="/admin">Admin</Link>
              <Link to="/update">Update</Link>
              <Link to="/comment">Comment</Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
}

export default Tagboard;
