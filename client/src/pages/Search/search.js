import React, { Component } from "react";
import { Link } from "react-router-dom";
// import {BrowserRouter as Router, Route} from "react-router-dom";
import {
  FormGroup,
  Input,
  Label,
  Small,
  FormBtn,
  Dropdown,
  Option
} from "../../components/Form";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Row from "../../components/Row";
import Col from "../../components/Col";
import API from "../../utils/API";
import CommentCard from "../../components/CommentCard/commentcard";
import "./search.css";
import moment from "moment"

class Search extends Component {
  state = {
    message: "",
    departmentselector: "Choose Department...",
    department_id: "",
    departments: [],
    comments: []
  };

  componentDidMount() {
    this.getDepartments();
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

  getDepartmentComments = id => {
    API.getDepartmentComments(id)
      .then(res => {
        (Array.isArray(res.data) && res.data.length > 0)
          ? this.setState({ comments: res.data, message: "Comments Found" })
          : this.setState({ comments: [], message: "No Comments Found" });
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
    if (name === "department_id" && value === "selectedID") {
      this.setState({ comments: [] });
    } else {
      if (name === "department_id" && value !== "selectedID")
        this.getDepartmentComments(value);
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Title>Search for Comments by Department</Title>
          <Title>{this.state.message}</Title>
          <Label text="Select a Department" />
          <Dropdown
            name="department_id"
            value={this.state.department_id}
            onChange={this.handleInputChange}
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
            {this.state.comments.reverse().map(comment => (
              <CommentCard
                comment={comment.comment}
                department={comment.department_id.name}
                submitter={`${comment.submitter_id.firstname} ${comment.submitter_id.lastname}`}
                thedate={comment.created}
              />
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Search;
