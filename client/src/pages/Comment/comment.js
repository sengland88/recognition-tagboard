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
import API from "../../utils/API";
import "./comment.css";

class Comment extends Component {
  state = {
    departmentselector: "Choose Department ...",
    departments: [],
    recognized: "",
    department: "",
    department_id: "",
    comment: ""
    // submitter: "",
    // type: "",
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

  comment = () => {

    API.submitComment({
      department_id: this.state.department_id,
      comment: this.state.comment      
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    
    this.props.history.push('/tagboard');

    this.setState({
      department: "",
      department_id: "",
      comment: ""
    });
    
    
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormChange = event => {
    const { name, value } = event.target.value
    this.setState({
      [name]: value
    });
  };

  handleDropDownChange = event => {
    this.setState( {department_id: event.target.value})
  };

  render() {
    return (
      <div>
        <Container>
          <Title>This is the comment page</Title>
          <Title>{this.state.message}</Title>
          <Row>
            <Col size="sm">
              <FormGroup>
                <Label text="Department" />
                <Dropdown
                  name="department"
                  value={this.state.department}
                  onChange={this.handleDropDownChange}
                >
                  {this.state.departments.map(department => (
                    <Option text={department.name} key={department._id} value={department._id}/>
                  ))}
                  ;
                </Dropdown> 
              </FormGroup>

              <FormGroup>
                <Label text="comment" />
                <TextArea
                  name="comment"
                  value={this.state.comment}
                  onChange={this.handleInputChange}
                  // placeholder="at least 8 characters"
                  type="text"
                  rows="4"
                />
              </FormGroup>

              <FormBtn
                text="Submit"
                onClick={this.comment}
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

export default withRouter(Comment) ;
