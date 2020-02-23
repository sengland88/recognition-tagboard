import React, { Component } from "react";
import { Link } from "react-router-dom";
// import {BrowserRouter as Router, Route} from "react-router-dom";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Row from "../../components/Row";
import Col from "../../components/Col";
// import API from "../../utils/API";
import "./search.css";

class Search extends Component {

  // state: {

  // }


  render() {
    return (
      <div>
        <Container>
          <Title>This is the tagboard</Title>
          <Row>
            <Col size="sm-3">this will be a form that will give employees the ability to search by department or by employee</Col>
            <Col size="sm-7">this will be the search results of the query from the left column</Col>

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

export default Search;
