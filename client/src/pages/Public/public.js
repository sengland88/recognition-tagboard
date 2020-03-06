import React, { Component } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel";
import Container from "../../components/Container";
import Title from "../../components/Title";
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
          <Container>
          <Title>Welcome to Valencia College's Recognition Application</Title>

            To sign up, <Link to="/register">click here.</Link>


          </Container>

          <p>
          </p>
        </div>
      </div>
    );
  }
}

export default Public;
