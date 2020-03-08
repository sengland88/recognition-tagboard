import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Row from "../../components/Row";
import Col from "../../components/Col";
import { Tabs, Tab, TabContainer, TabContent, TabPane } from "react-bootstrap/";
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
import API from "../../utils/API";
import "./comment.css";

class Comment extends Component {
  state = {
    departmentselector: "Choose Department ...",
    employees: [],
    departments: [],
    recognized: "",
    department: "",
    department_id: "",
    employee: "",
    employee_id: "",
    departmentComment: "",
    employeeComment: "",
    characters: 280,
    validCC: false,
    validDep: false,
    validUse: false,
    message: "Submit a Comment"
  };

  componentDidMount() {
    this.getDepartments();
    this.getEmployees();
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

  departmentComment = () => {
    API.submitCommentDepartment({
      department_id: this.state.department_id,
      employee_id: null,
      comment: this.state.departmentComment
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    // this.email()
    this.props.history.push("/tagboard");
  };

  employeeComment = () => {
    API.submitCommentEmployee({
      employee_id: this.state.employee_id,
      department_id: null,
      comment: this.state.employeeComment
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    // this.email()
    this.props.history.push("/tagboard");
  };

  // email = () => {
  //   console.log("email connected")
  //   API.sendEmail({
  //     comment: this.state.comment
  //   })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  validateField = (name, value) => {

        if (value.length > 280) {
          console.log("over 280");
          this.setState({
            validCC: false,
            characters: "Max 280 Characters",
            message: "Sorry — Comment Too Long"
          });
        } else if (value.length === 280) {
          console.log("you're at 280");
          this.setState({
            validCC: true,
            characters: 280,
            message: ""
          });
        } else if (value.length < 280) {
          console.log("you're under 280");
          this.setState({
            validCC: true,
            characters: this.state.characters + 1,
            message: ""
          });
        }
  };

  updateCount = num => {
    this.setState({ characters: this.state.comment.length - num });

    if (num > 280) this.negNumber(num);
  };

  negNum = num => {
    this.setState({ characters: 280 - num });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.validateField(name, value);
  };

  handleDropDownChangeDepartment = event => {
    this.setState({ department_id: event.target.value });
    event.target.value !== "selectedID"
      ? this.setState({ validDep: true, validCC: false })
      : this.setState({ validDep: false, validCC: false });
  };

  handleDropDownChangeEmployee = event => {
    this.setState({ employee_id: event.target.value });
    event.target.value !== "selectedID"
      ? this.setState({ validUse: true, validCC: false })
      : this.setState({ validUse: false, validCC: false });

    console.log(this.state);
  };

  tabChange = tab => {
    console.log(tab);

    switch (tab) {
      case "department":
        {
          this.setState({ employeeComment: "" });
        }
        break;
      case "employee": {
        this.setState({ departmentComment: "" });
      }
    }

    this.setState({ comment: "" });
  };

  render() {
    return (
      <div className="container">
        <img
          src="./imgs/comment.jpg"
          class="d-block w-100 img-fluid rounded"
          alt="Responsive image"
          id="coverPic"
        />
        <Title>{this.state.message}</Title>
        <Tabs
          defaultActiveKey="department"
          transition={false}
          id="noanim-tab-example"
        >
          <Tab
            eventKey="department"
            title="Comment on a Department"
            onClick={() => this.tabChange("department")}
          >
            <Row className="theUsers">
              <div className="container rounded" id="commentContainer">
                <form>
                  <FormGroup>
                    <Label text="Select a Department" />
                    <Dropdown
                      name="department"
                      value={this.state.department}
                      onChange={this.handleDropDownChangeDepartment}
                    >
                      {this.state.departments.map(department => (
                        <Option
                          text={department.name}
                          key={department._id}
                          value={department._id}
                        />
                      ))}
                      ;
                    </Dropdown>
                  </FormGroup>

                  <FormGroup>
                    <Label text="Write a Comment" />
                    <TextArea
                      name="departmentComment"
                      value={this.state.departmentComment}
                      onChange={this.handleInputChange}
                      type="text"
                      rows="6"
                    />
                    <Row>
                      <Col size="sm">
                        <Small text={this.state.message} />
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormBtn
                    disabled={
                      this.state.validCC && this.state.validDep
                        ? ""
                        : "disabled"
                    }
                    text="Submit"
                    onClick={this.departmentComment}
                    classes="btn-primary"
                  />
                </form>
              </div>
            </Row>
          </Tab>
          <Tab
            eventKey="employee"
            title="Comment on a Colleague"
            name="employeeTab"
            onClick={() => this.tabChange("employee")}
          >
            <Row className="theUsers">
              <div className="container rounded" id="commentContainer">
                <form>
                  <FormGroup>
                    <Label text="Select an Employee" />
                    <Dropdown
                      name="employee"
                      value={this.state.employee}
                      onChange={this.handleDropDownChangeEmployee}
                    >
                      {this.state.employees.map(employee => (
                        <Option
                          text={`${employee.firstname} ${employee.lastname}`}
                          key={employee._id}
                          value={employee._id}
                        />
                      ))}
                      ;
                    </Dropdown>
                  </FormGroup>

                  <FormGroup>
                    <Label text="Write a Comment" />
                    <TextArea
                      name="employeeComment"
                      value={this.state.employeeComment}
                      onChange={this.handleInputChange}
                      type="text"
                      rows="6"
                    />
                    <Row>
                      <Col size="sm">
                        <Small text={this.state.message} />
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormBtn
                    disabled={
                      (this.state.validCC && this.state.validDep) ||
                      (this.state.validCC && this.state.validUse)
                        ? ""
                        : "disabled"
                    }
                    text="Submit"
                    onClick={this.employeeComment}
                    classes="btn-primary"
                  />
                </form>
              </div>
            </Row>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(Comment);
