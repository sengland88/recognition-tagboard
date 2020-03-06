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
    firstname: "",
    lastname: "",
    position: "",
    department: "",
    startDate: ""
  };

  componentDidMount() {
    console.log("welcome page -- retrieving info");
    this.getInfo();
  }

  getInfo = () => {
    API.getUserInfo()
      .then(res => {
        if (res.data.message) {
          // this authorize will need to be changed to false
          this.setState({ authorized: false, admin: false });
        } else {
          this.setState({
            authorized: true,
            admin: res.data[0].admin,
            firstname: res.data[0].firstname,
            lastname: res.data[0].lastname,
            position: res.data[0].position,
            department: res.data[0].department_id.name
          });
        }
      })
      .catch(err => {
        console.log(err);
        // this authorize and admin will need to be changed to false
        this.setState({ authorized: false, admin: false });
      });
  };

  render() {
    return (
      <div className="container">
          <img src="./imgs/welcome.jpg" class="d-block w-100 img-fluid rounded" alt="Responsive image" id="coverPic"/>
        <Container>
          <Row>
            <Col className="border-right pr-2 border-danger" size="sm-3">
              <h4>Name</h4>
              <p>
                {this.state.firstname} {this.state.lastname}
              </p>
              <h4>Position</h4>
              <p>{this.state.position}</p>
              <h4>Department</h4>
              <p>{this.state.department}</p>
              <Link to="/update">Update</Link>
            </Col>
            <Col size="sm">
              <p>Welcome, {this.state.firstname}!</p>
              <p>This is Valencia College's Organizational Development and Human Resources' (ODHR) Recognition platform. Here, you will be able to submit comments for the departments within ODHR. Your comments will populate on the tagboard for all of ODHR to see.</p>
              <p>To submit a submit a recognition, <Link to="/comment">click here.</Link></p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Welcome;