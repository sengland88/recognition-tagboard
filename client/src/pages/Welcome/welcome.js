import React, { Component } from "react";
import { Link } from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Nav from "../../components/Nav";

import Container from "../../components/Container";
import Title from "../../components/Title";
import Row from "../../components/Row";
import Col from "../../components/Col";
import API from "../../utils/API";
import "./welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="container">
        <Container>
          <Title>this is the welcome page</Title>
          <Row>
            <Col size="sm-3">
            
            <div>
              <p>Employee's Photo</p>
              {/* <img src={props.imgOne} class="d-block w-100 img-fluid" alt="Responsive image"/> */}
            </div>
            <p>Employees' name</p>
            <p>Employees' Department</p>
            <p>Employees' Start Date</p>          
            
            </Col>
            <Col size="sm-7">
              <p>Welcome, XXXXX</p>
              <p>This month, we're featuring *insert department here*</p>
              <p>To submit a submit a recognition, click here.</p>
              <p>To submit a nomination for a colleague, click here.</p>
            </Col>

          </Row>
          <Row>
            <Col size="sm">
              <Link to="/welcome">Welcome</Link>
              <Link to="/tagboard">Tagboard</Link>
              <Link to="/search">Search</Link>
              <Link to="/admin">Admin</Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
}

export default Welcome;
