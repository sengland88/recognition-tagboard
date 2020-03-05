import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Jumbotron from "../../components/Jumbotron";
import Carousel from "../../components/Carousel";
import Container from "../../components/Container";
// import Title from "../../components/Title";
import Row from "../../components/Row";
// import Col from "../../components/Col";
import "./public.css";

class Public extends Component {
  render() {
    return (
      <div>
        <Carousel
        imgOne="./imgs/carousel_1.jpg"
        imgTwo="./imgs/carousel_2.jpg"
        imgThree="./imgs/carousel_3.jpg"
        />
        <div>
          <Row>
            <Link to="/login">Already registered? Click here.</Link>
            <Link to="/tagboard">Click here for tagboard.</Link>
            <Link to="/welcome">Welcome</Link>
            <Link to="/tagboard">Tagboard</Link>
            <Link to="/search">Search</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/update">Update</Link>
            <Link to="/comment">Comment</Link>
          </Row>
        </div>

      </div>
    );
  };
}

export default Public;