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

class Search extends Component {
  state = {
    message: "test message",
    departmentselector: "Choose Department...",
    department_id: "",
    departments: [],
    comments: [],
  };

  componentDidMount() {
    this.getDepartments();
  }

  getDepartments = () => {
    API.getDepartments()
      .then(res => {
        console.log(res.data);
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
        console.log(res);
        this.setState({ comments: res.data });
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
      this.setState({comments: []})
    } else {
      if (name === "department_id" && value !== "selectedID")
      this.getDepartmentComments(value);
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Title>This is the search page</Title>
              <Label text="Department" />
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
                submitter={`${comment.submitter_id.firstname} ${comment.submitter_id.lastname}`}
                thedate={comment.created}
                />
              ))}
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

export default Search;
