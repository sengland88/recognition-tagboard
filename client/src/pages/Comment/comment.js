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
import { ResponsiveEmbed } from "react-bootstrap";

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
    this.email()
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
  };

  email = () => {
    console.log("email connected")
    API.sendEmail({      
      comment: this.state.comment
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  validateField = (name, value) => {
    switch (name) {
      case "comment":
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
        break;
    }
  };

  updateCount = num => {

    this.setState({ characters: this.state.comment.length - num})   

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
    this.validateField(name, value)
  };


  handleDropDownChange = event => {
    console.log(event.target)
    this.setState({ department_id: event.target.value});
    event.target.value !== "selectedID"
      ? this.setState({ validDep: true })
      : this.setState({ validDep: false });
      console.log(this.state)

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
                        data={department.name}
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
                      <Small text={this.state.message} />
                    </Col>
                  </Row>
                </FormGroup>

                <FormBtn
                  disabled={
                    this.state.validCC && this.state.validDep ? "" : "disabled"
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
