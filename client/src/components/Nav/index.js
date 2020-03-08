import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Nav extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark justify-content-between"
        id="navi"
      >
        <a href="/">
          <img
            className="justify-content-start"
            src="./imgs/logo.jpg"
            className="theLogo"
            to="/"
          />
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/welcome"
                className={
                  window.location.pathname === "/welcome" ||
                  window.location.pathname === "/welcome"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Welcome
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/tagboard"
                className={
                  window.location.pathname === "/tagboard"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                View Tagboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/comment"
                className={
                  window.location.pathname === "/comment"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Submit Comment
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/search"
                className={
                  window.location.pathname === "/search"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Search Comments
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/update"
                className={
                  window.location.pathname === "/update"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Update Info
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin"
                className={
                  window.location.pathname === "/admin"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/logout"}
                onClick={this.props.logout}
                className={
                  window.location.pathname === "/logout"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
