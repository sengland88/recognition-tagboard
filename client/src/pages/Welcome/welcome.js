import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Row from "../../components/Row";
import Col from "../../components/Col";
import API from "../../utils/API";
import "./welcome.css";

class Welcome extends Component {
  state = {
    name: "",
    position: "",
    department: "",
    startDate: ""
  };

  componentDidMount() {
    console.log("welcome page -- retrieving info")
    this.getInfo()
  }

  getInfo = () => {
    API.isAuthorized()
      .then(res => {
        if (res.data.message) {
          // this authorize will need to be changed to false
          this.setState({ authorized: false, admin: true });
        } else {
          console.log(res.data)
          this.setState({ authorized: true, admin: res.data.admin, name: res.data.email});
        }
      })
      .catch(err => {
        console.log(err);
        // this authorize and admin will need to be changed to false
        this.setState({ authorized: false, admin: true });
      });
  }

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
              <p>Welcome, {this.state.name}</p>
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
