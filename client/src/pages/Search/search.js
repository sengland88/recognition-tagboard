import React, { Component } from "react";
import { Tabs, Tab} from "react-bootstrap/";
import {
  Dropdown,
  Option
} from "../../components/Form";
import Title from "../../components/Title";
import Row from "../../components/Row";
import API from "../../utils/API";
import CommentCard from "../../components/CommentCard/commentcard";
import "./search.css";

class Search extends Component {
  state = {
    message: "Search for Comments",
    departmentselector: "Choose Department...",
    employeeselector: "Choose Employee...",
    department_id: "",
    departments: [],
    employee_id: "",
    employees: [],
    comments: []
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

  getDepartmentComments = id => {
    this.setState({ employees: [], comments: [] });
    this.getEmployees();
    API.getDepartmentComments(id)
      .then(res => {
        Array.isArray(res.data) && res.data.length > 0
          ? this.setState({ comments: res.data, message: "Comments Found" })
          : this.setState({ comments: [], message: "No Comments Found" });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getEmployeeComments = id => {
    this.setState({ departments: [], comments: [] });
    this.getDepartments();
    API.getEmployeeComments(id)
      .then(res => {
        Array.isArray(res.data) && res.data.length > 0
          ? this.setState({ comments: res.data, message: "Comments Found" })
          : this.setState({ comments: [], message: "No Comments Found" });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleInputChangeDepartment = event => {
    this.setState({ comments: [] });
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if (name === "department_id" && value === "selectedID") {
      this.setState({ comments: [] });
    } else {
      if (name === "department_id" && value !== "selectedID")
        this.getDepartmentComments(value);
    }
  };

  handleInputChangeEmployee = event => {
    this.setState({ comments: [] });
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if (name === "employee_id" && value === "selectedID") {
      this.setState({ comments: [] });
    } else {
      if (name === "employee_id" && value !== "selectedID")
        this.getEmployeeComments(value);
    }
    console.log(name);
    console.log(value);
  };

  render() {
    return (
      <div className="container">
        <img
          src="./imgs/search.jpg"
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
          <Tab eventKey="department" title="Search by Department">
            <Row className="theUsers">
              <div className="rounded">
                <Dropdown
                  name="department_id"
                  value={this.state.department_id}
                  onChange={this.handleInputChangeDepartment}
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
                <Row>
                  {this.state.comments
                    .reverse()
                    .map(comment =>
                      comment.department_id ? (
                        <CommentCard
                          comment={comment.comment}
                          department={comment.department_id.name}
                          submitter={`${comment.submitter_id.firstname} ${comment.submitter_id.lastname}`}
                          thedate={comment.created}
                        />
                      ) : "" || comment.receiver_id ? (
                        <CommentCard
                          comment={comment.comment}
                          department={`${comment.receiver_id.firstname} ${comment.receiver_id.lastname}`}
                          submitter={`${comment.submitter_id.firstname} ${comment.submitter_id.lastname}`}
                          thedate={comment.created}
                        />
                      ) : (
                        ""
                      )
                    )}
                </Row>
              </div>
            </Row>
          </Tab>
          <Tab
            eventKey="employee"
            title="Search by Colleague"
            name="employeeTab"
          >
            <Row className="theUsers">
              <div className="rounded">
                <Dropdown
                  name="employee_id"
                  value={this.state.employee_id}
                  onChange={this.handleInputChangeEmployee}
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
                <Row>
                  {this.state.comments
                    .reverse()
                    .map(comment =>
                      comment.department_id ? (
                        <CommentCard
                          comment={comment.comment}
                          department={comment.department_id.name}
                          submitter={`${comment.submitter_id.firstname} ${comment.submitter_id.lastname}`}
                          thedate={comment.created}
                        />
                      ) : "" || comment.receiver_id ? (
                        <CommentCard
                          comment={comment.comment}
                          department={`${comment.receiver_id.firstname} ${comment.receiver_id.lastname}`}
                          submitter={`${comment.submitter_id.firstname} ${comment.submitter_id.lastname}`}
                          thedate={comment.created}
                        />
                      ) : (
                        ""
                      )
                    )}
                </Row>
              </div>
            </Row>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Search;
