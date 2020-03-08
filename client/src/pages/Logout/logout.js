import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";

class Logout extends Component {
  componentDidMount() {
    this.loggingOut();
  }

  loggingOut = () => {
    API.logout()
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });

  };

  render() {
    return (
    <div>
        <p>Logged out</p>
    </div>

    );
  }
}



export default withRouter(Logout) ;
