import React, { Component } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
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
          <div id="theContainer">
          <Container>
            <Row>
              <Col size="sm">
                <h3>The Valencia College Recognition Application</h3>
                <p>
                  Valencia College is a trail blazer in higher education —
                  taking the road less traveled. We couldn’t have accomplished a
                  great many things, like winning the inaugural Aspen Prize for
                  Community College Excellence award and becoming one of the
                  Great Colleges to Work For, without our extraordinary
                  employees.
                </p>
                <p>
                  Let's say that you just completed a tough project with a great
                  department within Organizational Development and Human
                  Resources. You want to give your awesome colleague some kudos,
                  but how can you do this when you work in different departments
                  or on different campuses? It’s easy with Valencia's
                  Recognition Application
                </p>

                <p>
                  With the Recognition Application, you recognize departments,
                  for a job well done. Our collective and dedicated work helps
                  inspire individuals — students and fellow colleagues — to
                  excellence.
                </p>

                <p>
                  If you have not signed up and started contributing to the
                  recognition conversation, start today. If you have, be sure to
                  sign in and leave a comment for a department doing great work.
                </p>
                To sign up, <Link to="/register">click here.</Link>
              </Col>
              <Col size="sm">
                <img
                  src="./imgs/thanks.jpg"
                  class="d-block w-100 img-fluid rounded"
                  alt="Responsive image"
                  id="coverPic"
                />
              </Col>
            </Row>
          </Container>   
          </div>     
        </div>
      </div>
    );
  }
}

export default Public;
