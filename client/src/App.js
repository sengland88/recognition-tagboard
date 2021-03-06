import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import API from "./utils/API";

//pages
import Public from "./pages/Public/public.js";
import Login from "./pages/Login/login.js";
import Register from "./pages/Register/register.js";
import Welcome from "./pages/Welcome/welcome.js";
import Tagboard from "./pages/Tagboard/tagboard.js";
import Search from "./pages/Search/search.js";
import Comment from "./pages/Comment/comment.js";
import Admin from "./pages/Admin/admin.js";
import Update from "./pages/Update/update.js";
import Logout from "./pages/Logout/logout.js";
import NoMatch from "./pages/NoMatch/nomatch.js";

// components
import Nav from "./components/Nav";


class App extends Component {
  state = {
    // authorize and admin will need to be changed to false
    authorized: false,
    admin: true,
    display: false
  };

  componentDidMount() {
    this.isAuthorized();
  }

  isAuthorized = () => {
    API.isAuthorized()
      .then(res => {
        if (res.data.message) {
          // this authorize will need to be changed to false
          this.setState({ authorized: false, admin: false, display: true });
        } else {
          this.setState({
            authorized: true,
            admin: res.data.admin,
            display: true
          });
        }
      })
      .catch(err => {
        console.log(err);
        // this authorize and admin will need to be changed to false
        this.setState({ authorized: false, admin: false, display: true });
      });
  };

  logout = () => {
    API.logout()
      .then(res => {
        console.log("logged out");
        this.isAuthorized();
        this.setState({ authorized: false, admin: false, display: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Router>
        {this.state.display ? (
          <React.Fragment>
            <Nav logout={this.logout} />
            <Switch>
              <Route exact path="/login">
                <Login
                  isAuthorized={this.isAuthorized}
                  authorized={this.state.authorized}
                  redirect={window.location.pathname}
                />
              </Route>

              <Route exact path="/register">
                {this.state.authorized ? (
                  <Redirect to="/welcome" />
                ) : (
                  <Register isAuthorized={this.isAuthorized} />
                )}
              </Route>

              <Route path="/welcome">
                {this.state.authorized ? <Welcome /> : <Redirect to="/login" />}
              </Route>

              <Route exact path="/tagboard">
                {this.state.authorized ? (
                  <Tagboard />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>

              <Route exact path="/search">
                {this.state.authorized ? <Search /> : <Redirect to="/login" />}
              </Route>

              <Route exact path="/admin">
                {this.state.admin && this.state.authorized ? <Admin /> : <Redirect to="/login" />}
              </Route>

              <Route exact path="/update">
                {this.state.authorized ? <Update /> : <Redirect to="/login" />}
              </Route>

              <Route exact path="/comment">
                {this.state.authorized ? <Comment /> : <Redirect to="/login" />}
              </Route>

              <Route exact path="/logout">
              {this.state.authorized ? <Logout logout={this.logout} /> : <Redirect to="/" />}
              </Route>

              <Route exact path="/">
                <Public />
              </Route>

              <Route>
                <NoMatch />
              </Route>
            </Switch>
          </React.Fragment>
        ) : (
          ""
        )}
      </Router>
    );
  }
}

export default App;
