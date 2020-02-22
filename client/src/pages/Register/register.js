import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "../../components/Grid";
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
import "./register.css";

class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    position: "",
    departments: [],
    department: "",
    departmentselector: "Choose Department ...",
    username: "",
    email: "",
    password: "",
    confirm: "",
    validFN: false,
    validLN: false,
    validPO: false,
    validUN: false,
    validEM: false,
    validPW: false,
    validCF: false,
    error: "",
    // eslint-disable-next-line
    reg: new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  };

  componentDidMount() {
    this.getDepartments();
  }

  validateField = (name, value) => {
    switch (name) {
      case "firstname":
        this.setState({ validFN: value !== "" });
        break;
      case "lastname":
        this.setState({ validLN: value !== "" });
        break;
      case "position":
        this.setState({ validPO: value !== "" });
        break;
      case "department":
        this.setState({ validDP: value !== "" && value !== this.state.departmentselector });
        break;
      case "username":
        if (value.length > 7) {
          API.availableUN(value.toLowerCase())
            .then(res => {
              res.data.length < 1
                ? this.setState({ validUN: true })
                : this.setState({ validUN: false });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.setState({ validUN: false });
        }
        break;
      case "email":
        this.setState({ validEM: this.state.reg.test(value) });
        break;
      case "password":
        this.setState({
          validPW: value.length > 7,
          validCF: value.length > 7 && value === this.state.confirm
        });
        break;
      case "confirm":
        this.setState({
          validCF: this.state.validPW && this.state.password === value
        });
        break;
      default:
    }
  };

  register = event => {
    event.preventDefault();

    API.register({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      position: this.state.position,
      username: this.state.username.toLowerCase(),
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        if (res.data.message) {
          this.setState({
            error: res.data.message
          });
        } else {
          console.log("registration successful");
          this.props.isAuthorized();
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: "A server error has occurred." });
      });

    this.setState({
      password: "",
      confirm: ""
    });
  };

  getDepartments = () => {
    API.getDepartments()
      .then(res => {
        console.log(res.data);
        res.data.unshift({
          _id: "selectedID",
          department: this.state.departmentselector
        });
        this.setState({ departments: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.department);
    this.validateField(name, value);
  };

  render() {
    return (
      <div className="container rounded" id="registerContainer">
        <form>
          <FormGroup>
            <Row>
              <Col size="sm-6">
                <Label text="First Name" />
                <Input
                  name="firstname"
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                  placeholder="John"
                  type="text"
                />
                <Small
                  text={this.state.validFN ? "" : "No first name entered"}
                />
              </Col>
              <Col size="sm-6">
                <Label text="Last Name" />
                <Input
                  name="lastname"
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                  placeholder="Smith"
                  type="text"
                />
                <Small
                  text={this.state.validLN ? "" : "No last name entered"}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row>
              <Col size="sm-6">
                <Label text="Position" />
                <Input
                  name="position"
                  value={this.state.position}
                  onChange={this.handleInputChange}
                  placeholder="Coordinator"
                  type="text"
                />
                <Small text={this.state.validPO ? "" : "No position entered"} />
              </Col>
              <Col size="sm-6">
                <Label text="Department" />
                <Dropdown
                  name="department"
                  value={this.state.department}
                  onChange={this.handleInputChange}
                >
                  {this.state.departments.map(department => (
                    <Option text={department.department} key={department._id} />
                  ))}
                  ;
                </Dropdown>
                <Small
                  text={this.state.validDP ? "" : "No department chosen"}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Label text="Username" />
            <Input
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              placeholder="at least 8 characters"
              type="text"
            />
            {this.state.validUN ? (
              <Small text="Username is available" />
            ) : (
              <Small text="Username is not available" />
            )}
          </FormGroup>
          <FormGroup>
            <Label text="Email" />
            <Input
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              placeholder="Email"
              type="email"
            />
            {this.state.validEM ? (
              <Small text="Email is valid" />
            ) : (
              <Small text="Email is invalid" />
            )}
          </FormGroup>
          <FormGroup>
            <Label text="Password" />
            <Input
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="at least 8 characters"
              type="password"
            />
            {this.state.validPW ? (
              <Small text="Password is valid" />
            ) : (
              <Small text="Password must be at least 8 characters" />
            )}
          </FormGroup>
          <FormGroup>
            <Label text="Confirm Password" />
            <Input
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleInputChange}
              type="password"
            />
            {this.state.validCF ? (
              <Small text="Passwords match" />
            ) : (
              <Small text="Passwords don't match" />
            )}
          </FormGroup>
          {this.state.error ? <Small text={this.state.error} /> : ""}

          <FormGroup>
            <FormBtn
              disabled={
                this.state.validFN &&
                this.state.validLN &&
                this.state.validPO &&
                this.state.validDP &&
                this.state.validUN &&
                this.state.validEM &&
                this.state.validCF
                  ? ""
                  : "disabled"
              }
              text="Submit"
              onClick={this.register}
              classes="btn-primary"
            />
            <Link to="/login">Already registered? Click here.</Link>
            <Link to="/welcome">Welcome</Link>
            <Link to="/tagboard">Tagboard</Link>
            <Link to="/search">Search</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/update">Update</Link>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default Register;
