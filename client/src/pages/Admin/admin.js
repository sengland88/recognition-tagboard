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
import { Button } from "react-bootstrap";

class Admin extends Component {
  state = {
    employee_id: "",
    employeeSelector: "Choose Employee",
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
        res.data.unshift({
          _id: "selectedID",
          name: this.state.employeeSelector
        });
        this.setState({ employees: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteComment = event => {
    event.preventDefault();
    console.log("this works");
    API.deleteComment()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getInfo = () => {
    console.log(this.state.employee_id)


    API.getEmployeeInfo({
      id: this.state.employee_id
    })
      .then(res => {
        if (res.data.message) {
          // this authorize will need to be changed to false
          this.setState({ authorized: false, admin: false });
        } else {
          console.log(res);
          this.setState({});
        }
      })
      .catch(err => {
        console.log(err);
        // this authorize and admin will need to be changed to false
        this.setState({ authorized: false, admin: false });
      });
  };

  userUpdate = event => {
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

  userDelete = event => {
    event.preventDefault();
    console.log("this works");
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.employee_id);
  };

  render() {
    return (
      <div>
        <Container>
          <Title>This is the Admin</Title>
          <Row>

            <FormGroup>
              <Dropdown
                name="employee_id"
                value={this.state.employee_id}
                onChange={this.handleInputChange}
              >
                {this.state.employees.map(employee => (
                  <Option
                    text={`${employee.firstname} ${employee.lastname}`}
                    value={employee._id}
                    key={employee._id}
                  ></Option>
                ))}
              </Dropdown>
            </FormGroup>
            <Button onClick={this.getInfo}>Fetch User Info</Button>

            <hr></hr>

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
                <Label text="email" />
                <Input
                  name="email"
                  value={this.state.email}
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
                text="Update"
                onClick={this.userUpdate}
                classes="btn-primary"
              />
              <FormBtn
                text="Delete"
                onClick={this.userDelete}
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
