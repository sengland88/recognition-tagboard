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
    comment: "",
    characters: 280,
    validCC: false,
    validDep: false,
    message: ""
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
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    this.props.history.push("/tagboard");

    this.setState({
      department: "",
      department_id: "",
      comment: ""
    });
  };

  validateField = (name, value) => {
    switch (name) {
      case "comment":
        if (value.length > 280) {
          console.log("over 280");
          this.setState({
            validCC: false,
            characters: this.state.characters + this.state.comment.length,
            message: "comment too long"
          });
        } else if (value.length === 280) {
          console.log("you're at 280");
          this.setState({
            validCC: true,
            characters: this.state.characters - this.state.comment.length,
            message: ""
          });
        } else if (value.length < 280) {
          console.log("you're under 280");
          this.setState({
            validCC: true,
            characters: this.state.characters - this.state.comment.length,
            message: ""
          });
        }
        break;
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.validateField(name, value);
  };

  handleFormChange = event => {
    const { name, value } = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleDropDownChange = event => {
    this.setState({ department_id: event.target.value });
    event.target.value !== "selectedID"
      ? this.setState({ validDep: true })
      : this.setState({ validDep: false });
  };

  render() {
    return (
      <div>
        {/* <Container> */}
          <Title>This is the comment page</Title>
          <Title>{this.state.message}</Title>
          <Row>
            <Col size="sm">
              <div className="container rounded" id="commentContainer">
                <form>
                  <FormGroup>
                    <Label text="Select a Department" />
                    <Dropdown
                      name="department"
                      value={this.state.department}
                      onChange={this.handleDropDownChange}
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
                    <Label text="Leave a Comment" />
                    <TextArea
                      name="comment"
                      value={this.state.comment}
                      onChange={this.handleInputChange}
                      type="text"
                      rows="6"
                    />
                    <Row>
                      <Col size="sm">
                        <Small text={this.state.characters} />
                      </Col>
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
                    onClick={this.comment}
                    classes="btn-primary"
                  />
                </form>
              </div>
            </Col>
          </Row>
        {/* </Container> */}
      </div>
    );
  }
}

export default withRouter(Comment);