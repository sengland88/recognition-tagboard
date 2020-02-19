import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Row from "../../components/Row";
import Col from "../../components/Col";
import { FormGroup, Input, Label, Small, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./update.css";

class Welcome extends Component {
  state = {
    name: "",
    position: "",
    department: ""
  };

  update = () => {
    console.log("button works")
  }

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
          <Title>this is the update page</Title>
          <Row>
            <Col size="sm">
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
            <Col>
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
