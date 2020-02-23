import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Row from "../../components/Row";
import Col from "../../components/Col";
import { FormGroup, Input, Label, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./info.css";

class Welcome extends Component {
  state = {
    name: "",
    position: "",
    department: "",
    admin: false,
    error: ""
  };

  update = event => {
    console.log("button works");
    event.preventDefault();
    API.update({
      name: this.state.name,
      position: this.state.position,
      department: this.state.department,
      admin: this.state.admin
    })
      .then(res => {
        if (res.data.message) {
          console.log("didn't work");
          this.setState({ error: res.data.message });
        } else {
          console.log("information added");
          this.props.isAuthorized();
        }
      })
      .catch(err => {
        console.log("an error");
        console.log(err);
        this.setState({ error: "A server error has occurred." });
      });

    this.setState({
      name: "",
      position: "",
      department: ""
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="container">
        <Container>
          <Title>this is the info page</Title>
          <Row>
            <Col size="sm">
              <p>
                Welcome to Valencia College's Recognition platform. Now that
                you're here, we need a little bit of information about you, like
                your name, position and department.
              </p>
              <FormGroup>
                <Label text="Name" />
                <Input
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  // placeholder="at least 8 characters"
                  type="text"
                />
              </FormGroup>

              <FormGroup>
                <Label text="Position" />
                <Input
                  name="position"
                  value={this.state.position}
                  onChange={this.handleInputChange}
                  // placeholder="at least 8 characters"
                  type="text"
                />
              </FormGroup>

              <FormGroup>
                <Label text="Department" />
                <Input
                  name="department"
                  value={this.state.department}
                  onChange={this.handleInputChange}
                  // placeholder="at least 8 characters"
                  type="text"
                />
              </FormGroup>

              <FormBtn
                text="Submit"
                onClick={this.update}
                classes="btn-primary"
              />
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
