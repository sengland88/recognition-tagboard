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
    API.welcome()
      .then(res => {
        if (res.data.message) {
          // this authorize will need to be changed to false
          this.setState({ authorized: false, admin: false });
        } else {
          console.log(res);
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
        <Container>
          <Title>this is the welcome page</Title>
          <Row>
            <Col size="sm-3">
              <div>
                <p>Employee's Photo</p>
                {/* <img src={props.imgOne} class="d-block w-100 img-fluid" alt="Responsive image"/> */}
              </div>
              <h4>Name</h4>
              <p>
                {this.state.firstname} {this.state.lastname}
              </p>
              <h4>Position</h4>
              <p>{this.state.position}</p>
              <h4>Department</h4>
              <p>{this.state.department}</p>
              {/* <h4>Start Date</h4>
              <p>Employees' Start Date</p> */}
              <Link to="/update">Update</Link>
            </Col>
            <Col size="sm-7">
              <p>Welcome, {this.state.firstname}!</p>
              <p>This month, we're featuring *insert department here*</p>
              <p>To submit a submit a recognition, <Link to="/comment">click here.</Link></p>
              <p>To submit a nomination for a colleague, click here.</p>
            </Col>
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
  }
}

export default Welcome;
