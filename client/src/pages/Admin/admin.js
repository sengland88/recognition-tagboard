import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Title from "../../components/Title";
import { FormGroup, Input, Label, Small, FormBtn } from "../../components/Form";
import "./admin.css";

class Admin extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };



  render() {
    return (
      <div>
        <Container>
          <Title>This is the Admin</Title>
            <Link to="/welcome">Welcome</Link>
            <Link to="/tagboard">Tagboard</Link>
            <Link to="/search">Search</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/update">Update</Link>
            <Link to="/comment">Comment</Link>
        </Container>
      </div>
    );
  };
}

export default Admin;