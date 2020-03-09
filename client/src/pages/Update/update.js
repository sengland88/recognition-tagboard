import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Row from "../../components/Row";
import Col from "../../components/Col";
import {
  FormGroup,
  Input,
  Label,
  FormBtn,
  Dropdown,
  Option
} from "../../components/Form";
import API from "../../utils/API";
import "./update.css";

class Update extends Component {
  state = {
    message: "Please confirm your information below.",
    departmentselector: "Use ONLY if you have changed departments",
    image: null,
    firstname: "",
    lastname: "",
    position: "",
    departments: [],
    email: "",
    error: ""
  };

  componentDidMount() {
    this.getDepartments();
    this.getInfo();
  }

  getDepartments = () => {
    API.getDepartments()
      .then(res => {
        res.data.unshift({
          _id: "selectedID",
          name: this.state.departmentselector
        });
        console.log(res)
        this.setState({ departments: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getInfo = () => {
    API.getUserInfo()
      .then(res => {
        if (res.data.message) {
          // this authorize will need to be changed to false
          this.setState({ authorized: false, admin: false });
        } else {
          this.setState({
            firstname: res.data[0].firstname,
            lastname: res.data[0].lastname,
            position: res.data[0].position,
            department: res.data[0].department_id.name,
            email: res.data[0].email
          });
        }
      })
      .catch(err => {
        console.log(err);
        // this authorize and admin will need to be changed to false
        this.setState({ authorized: false, admin: false });
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({ image: event.target.files[0] });
  };

  fileUploadHandler = () => {
    console.log("this works");
    const fd = new FormData();
    fd.append("image", this.state.image, this.state.image.name);
    console.log(fd);

    API.imageUpload(fd)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  update = event => {
    console.log("button works");
    event.preventDefault();
    API.updateMyInfo({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      position: this.state.position,
      department_id: this.state.departments.filter(
        department => department.name === this.state.department
      )[0],
      email: this.state.email
    })
      .then(res => {
        if (res.data.message) {
          console.log("didn't work");
          this.setState({ message: res.data.message });
        } else {
          console.log("information added");
          this.setState({ message: "Your information has been updated" });
        }
      })
      .catch(err => {
        console.log("an error");
        console.log(err);
        this.setState({ message: "A server error has occurred." });
      });

    this.setState({});
  };

  render() {
    return (
      <div>
        <Container>
          <Title>{this.state.message}</Title>
          <Row>
            <Col size="sm">
              <FormGroup>
                <Row>
                  <Col size="sm-6">
                    <Label text="First Name" />
                    <Input
                      name="firstname"
                      value={this.state.firstname}
                      onChange={this.handleInputChange}
                      type="text"
                    />
                  </Col>
                  <Col size="sm-6">
                    <Label text="Last Name" />
                    <Input
                      name="lastname"
                      value={this.state.lastname}
                      onChange={this.handleInputChange}
                      placeholder="Smith"
                      type="text"
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
                  </Col>
                  <Col size="sm-6">
                    <Label text="Department" />
                    <Dropdown
                      name="department"
                      value={this.state.department}
                      onChange={this.handleInputChange}
                    >
                      {this.state.departments.map(department => (
                        <Option text={department.name} key={department._id} />
                      ))}
                      ;
                    </Dropdown>
                  </Col>
                </Row>
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
              </FormGroup>

              <FormBtn
                text="Submit"
                onClick={this.update}
                classes="btn-primary"
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Update);
