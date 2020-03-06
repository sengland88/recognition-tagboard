import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Row from "../../components/Row";
import Col from "../../components/Col";
import {
  FormGroup,
  Input,
  Label,
  TextArea,
  Small,
  FormBtn,
  Dropdown,
  Option
} from "../../components/Form";
import Table, {
  THead,
  THeading,
  TBody,
  TRow,
  TData
} from "../../components/Table";
import API from "../../utils/API";
import "./admin.css";
import { Button } from "react-bootstrap";
import { Tabs, Tab, TabContainer, TabContent, TabPane } from "react-bootstrap/";

class Admin extends Component {
  state = {
    message: "Update Info Here",
    employee_id: "",
    departments: [],
    comments: [],
    employees: [],
    firstname: "",
    lastname: "",
    position: "",
    department: "",
    admin: ""
  };

  componentDidMount() {
    this.getEmployees();
    this.getDepartments();
    this.getComments();
  }

  getDepartments = () => {
    API.getDepartments()
      .then(res => {
        res.data.unshift({
          _id: "selectedID",
          name: this.state.departmentselector
        });
        this.setState({ departments: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateDepartment = id => {
    console.log(`Update: This is the id: ${id}`);
    console.log(this.state[`department${id}}`]);
    // API.updateDepartment({
    //   department: id,
    //   name: this.state[`department${id}}`]
    // })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  deleteDepartment = id => {
    console.log(`Delete: This is the id: ${id}`);
    // API.deleteComment(id)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  getEmployees = () => {
    API.getEmployees()
      .then(res => {
        res.data.unshift({
          _id: "selectedID",
          firstname: "Choose",
          lastname: "Employee"
        });
        this.setState({ employees: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getComments = () => {
    API.getComments()
      .then(res => {
        console.log(res);
        let comments = res.data.reverse();
        this.setState({ comments: comments });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateComment = id => {
    console.log(`Update: This is the id: ${id}`);
    console.log(this.state[`comment_${id}}`]);
    API.updateComment({
      comment_id: id,
      comment: this.state[`comment_${id}}`]
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteComment = id => {
    console.log(`Delete: This is the id: ${id}`);
    API.deleteComment(id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getEmployeeInfo = id => {
    API.getEmployeeInfo(id)
      .then(res => {
        if (res.data.message) {
          // this authorize will need to be changed to false
          this.setState({ authorized: false, admin: false });
        } else {
          console.log(res);
          this.setState({
            employee_id: res.data._id,
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            position: res.data.position,
            email: res.data.email,
            admin: res.data.admin
          });
        }
      })
      .catch(err => {
        console.log(err);
        // this authorize and admin will need to be changed to false
        this.setState({ authorized: false, admin: false });
      });
  };

  updateUser = event => {
    console.log("button works");
    event.preventDefault();
    API.updateUserInfo({
      _id: this.state.employee_id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      position: this.state.position,
      department_id: this.state.departments.filter(
        department => department.name === this.state.department
      )[0],
      email: this.state.email,
      admin: this.state.admin
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
  };

  userDelete = event => {
    event.preventDefault();
    console.log("this works");
    API.deleteUser(this.state.employee_id)
      .then(res => {
        if (res.data.message) {
          console.log("didn't work");
          this.setState({ message: res.data.message });
        } else {
          console.log("user delete");
          this.setState({ message: "User has been delete" });
        }
      })
      .catch(err => {
        console.log("an error");
        console.log(err);
        this.setState({ message: "A server error has occurred." });
      });

    this.setState({});
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if (name === "admin" && value !== "") this.setState({ admin: value });
    if (name === "employee_id" && value !== "selectedID")
      this.getEmployeeInfo(value);

    if (name === "employee_id" && value === "selectedID") {
      this.setState({
        employee_id: "",
        firstname: "",
        lastname: "",
        position: "",
        email: "",
        admin: ""
      });
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Title>This is the Admin</Title>
          <Title>{this.state.message}</Title>
          <Tabs
            defaultActiveKey="users"
            transition={false}
            id="noanim-tab-example"
          >
            <Tab eventKey="users" title="Manager Users">
              <Row className="theUsers">
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

                <hr></hr>
              </Row>
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
                        <Small
                          text={
                            this.state.validFN ? "" : "No first name entered"
                          }
                        />
                      </Col>
                      <Col size="sm-6">
                        <Label text="Last Name" />
                        <Input
                          name="lastname"
                          value={this.state.lastname}
                          onChange={this.handleInputChange}
                          type="text"
                        />
                        <Small
                          text={
                            this.state.validLN ? "" : "No last name entered"
                          }
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
                          type="text"
                        />
                        <Small
                          text={this.state.validPO ? "" : "No position entered"}
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
                            <Option
                              text={department.name}
                              key={department._id}
                            />
                          ))}
                          ;
                        </Dropdown>
                        <Small
                          text={
                            this.state.validDP ? "" : "No department chosen"
                          }
                        />
                      </Col>
                    </Row>
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
                    <Dropdown
                      name="admin"
                      value={this.state.admin}
                      onChange={this.handleInputChange}
                    >
                      <Option text="Choose Admin Rights..."></Option>
                      <Option value="false" text="False" />
                      <Option value="true" text="True" />
                    </Dropdown>
                  </FormGroup>

                  <FormBtn
                    text="Update"
                    onClick={this.updateUser}
                    classes="btn-primary"
                  />
                  <FormBtn
                    text="Delete"
                    onClick={this.userDelete}
                    classes="btn-primary"
                  />
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="comments" title="Manage Comments">
              <Row>
                <Table
                  comments={this.state.comments}
                  update={this.updateComment}
                  delete={this.deleteComment}
                >
                  <THead>
                    <TRow>
                      <THeading>Submitter</THeading>
                      <THeading>Department</THeading>
                      <THeading>Comment</THeading>
                      <THeading>Update</THeading>
                      <THeading>Delete</THeading>
                    </TRow>
                  </THead>
                  <TBody>
                    {this.state.comments.map(comment => (
                      <TRow>
                        <TData>{comment.submitter_id.firstname}</TData>
                        <TData>{comment.department_id.name}</TData>
                        <TData>
                          <TextArea
                            name={`comment_${comment._id}}`}
                            value={this.state[`comment_${comment._id}}`]}
                            onChange={this.handleInputChange}
                          >
                            {comment.comment}
                          </TextArea>
                        </TData>
                        <TData>
                          <Button
                            disabled={!this.state[`comment_${comment._id}}`]}
                            onClick={() => this.updateComment(comment._id)}
                          >
                            Update
                          </Button>
                        </TData>
                        <TData>
                          <Button
                            variant="danger"
                            onClick={() => this.deleteComment(comment._id)}
                          >
                            Delete
                          </Button>
                        </TData>
                      </TRow>
                    ))}
                  </TBody>
                </Table>
              </Row>
            </Tab>

            <Tab eventKey="departments" title="Manage Departments">
              <Row>
                <Table
                  comments={this.state.departments}
                  update={this.updateDepartment}
                  delete={this.deleteDepartment}
                >
                  <THead>
                    <TRow>
                      <THeading>Department</THeading>
                      <THeading>Update</THeading>
                      <THeading>Delete</THeading>
                    </TRow>
                  </THead>
                  <TBody>
                    {this.state.departments.map(department => (
                      <TRow>
                        <TextArea
                          name={`department${department._id}}`}
                          value={this.state[`department${department._id}}`]}
                          onChange={this.handleInputChange}
                        >
                          {department.name}
                        </TextArea>
                        <TData>
                          <Button
                            disabled={
                              !this.state[`department${department._id}}`]
                            }
                            onClick={() =>
                              this.updateDepartment(department._id)
                            }
                          >
                            Update
                          </Button>
                        </TData>
                        <TData>
                          <Button
                            variant="danger"
                            onClick={() => this.deleteDepartment(department._id)}
                          >
                            Delete
                          </Button>
                        </TData>
                      </TRow>
                    ))}
                  </TBody>
                </Table>
              </Row>
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}

export default withRouter(Admin);
