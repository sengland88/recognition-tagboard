import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Title from "../../components/Title";
import Row from "../../components/Row";
import Col from "../../components/Col";
import {
  FormGroup,
  Input,
  TextArea,
  Label,
  Small,
  FormBtn
} from "../../components/Form";
import API from "../../utils/API";
import "./comment.css";

class Comment extends Component {
  state = {
    recognized: "",
    type: "",
    comment: ""
  };

  comment = () => {
    console.log("button works");
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.type);
    console.log(this.state.comment);
  };

  render() {
    return (
      <div>
        <Container>
          <Title>This is the comment page</Title>

          <Row>
            <Col size="sm">
              <FormGroup>
                <Label text="type" />
                <Input
                  name="type"
                  value={this.state.type}
                  onChange={this.handleInputChange}
                  // placeholder="at least 8 characters"
                  type="text"
                />
              </FormGroup>

              <FormGroup>
                <Label text="type" />
                <Input
                  name="type"
                  value={this.state.type}
                  onChange={this.handleInputChange}
                  // placeholder="at least 8 characters"
                  type="text"
                />
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

export default Comment;
