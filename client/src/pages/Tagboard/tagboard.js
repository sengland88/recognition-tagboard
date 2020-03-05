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
        console.log(res);
        this.setState({ comments: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container theContainer">
        <Container>
          <Title>This is the tagboard</Title>
          <Title>{this.state.message}</Title>
          <button>
            <Link to="/comment">Add Comment</Link>
          </button>
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

export default withRouter(Tagboard);
