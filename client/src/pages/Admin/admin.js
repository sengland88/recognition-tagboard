import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Title from "../../components/Title";
import "./admin.css";

class Admin extends Component {
  render() {
    return (
      <div>
        <Container>
          <Title>This is the Admin</Title>
            <Link to="/welcome">Welcome</Link>
            <Link to="/tagboard">Tagboard</Link>
            <Link to="/search">Search</Link>
            <Link to="/admin">Admin</Link>
        </Container>
      </div>
    );
  };
}

export default Admin;
