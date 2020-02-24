import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Row from "../../components/Row";
import Col from "../../components/Col";
import {
  FormGroup,
  Input,
  Label,
  Small,
  FormBtn,
  Dropdown,
  Option
} from "../../components/Form";
import API from "../../utils/API";
import "./admin.css";
import DropdownMenu from "react-bootstrap/DropdownMenu";

class Admin extends Component {
  state = {
    employees: [],
    name: "",
    position: "",
    department: "",
    admin: ""
  };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = () => {
    API.getEmployees()
      .then(res => {
        console.log(res);
        this.setState({ employees: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  admin = event => {
    event.preventDefault();
    API.admin({
      name: this.state.name,
      position: this.state.position,
      department: this.state.department,
      admin: this.state.admin
    }).then(res => {
      console.log("admin is done");
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
      <div>
        <Container>
          <Title>This is the Admin</Title>
          <Row>
            <FormGroup>
              <Dropdown>
                {this.state.employees.map(employee => (
                  <Option text={`${employee.firstname} ${employee.lastname}`} value={employee._id}></Option>
                ))}
              </Dropdown>
            </FormGroup>
          </Row>
          <Row>
            <Col size="sm">
              <FormGroup>
                <Label text="name" />
                <Input
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  // placeholder="at least 8 characters"
                  type="text"
                />
              </FormGroup>

              <FormGroup>
                <Label text="position" />
                <Input
                  name="position"
                  value={this.state.position}
                  onChange={this.handleInputChange}
                  // placeholder="at least 8 characters"
                  type="text"
                />
              </FormGroup>

              <FormGroup>
                <Label text="department" />
                <Input
                  name="department"
                  value={this.state.department}
                  onChange={this.handleInputChange}
                  // placeholder="at least 8 characters"
                  type="text"
                />
              </FormGroup>

              <FormGroup>
                <Label text="admin" />
                <Input
                  name="admin"
                  value={this.state.admin}
                  onChange={this.handleInputChange}
                  // placeholder="at least 8 characters"
                  type="text"
                />
              </FormGroup>

              <FormBtn
                text="Submit"
                onClick={this.admin}
                classes="btn-primary"
              />
            </Col>
          </Row>

          <Link to="/welcome">Welcome</Link>
          <Link to="/tagboard">Tagboard</Link>
          <Link to="/search">Search</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/update">Update</Link>
          <Link to="/comment">Comment</Link>
        </Container>
      </div>
    );
  }
}

export default Admin;
