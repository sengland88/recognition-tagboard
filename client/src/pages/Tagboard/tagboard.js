import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col } from "../../components/Grid";
import Title from "../../components/Title";
import { FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./tagboard.css";
import CommentCard from "../../components/CommentCard/commentcard";

class Tagboard extends Component {
  state = {
    message: "test message",
    comments: []
  };

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    API.getComments()
      .then(res => {
        this.setState({ comments: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  createComment = () => {
    this.props.history.push("/comment");
  };

  render() {
    return (
      <div className="container theContainer">
        <Container>
          {/* <Title>This is the tagboard</Title>
          <Title>{this.state.message}</Title> */}
<Title>This is the tagboard</Title>
          <Row>
            <Col size="sm-9">
              <p>Here are the comments said about your fellows departments.</p>
            </Col>
            <Col size="sm" className="align-middle">          <form>
            <FormBtn
              text="Leave a Comment"
              classes="btn-dark"
              onClick={this.createComment}
            ></FormBtn>
          </form></Col>
          </Row>

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

export default withRouter(Tagboard);
