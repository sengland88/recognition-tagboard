import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" id="navi">
      <img src="./imgs/logo.jpg" className="theLogo" />
      <div className="justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/welcome"
              className={
                window.location.pathname === "/welcome" || window.location.pathname === "/welcome"
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
              className={window.location.pathname === "/tagboard" ? "nav-link active" : "nav-link"}
            >
              View Tagboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/comment"
              className={window.location.pathname === "/comment" ? "nav-link active" : "nav-link"}
            >
              Submit Comment
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/search"
              className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}
            >
              Search Comments
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/update"
              className={window.location.pathname === "/update" ? "nav-link active" : "nav-link"}
            >
              Update Info
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin"
              className={window.location.pathname === "/admin" ? "nav-link active" : "nav-link"}
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

{/* <a className="dropdown-item" href="/welcome">Welcome</a>
<a className="dropdown-item" href="/tagboard">View tagboard</a>
<a className="dropdown-item" href="/comment">Create Comment</a>
<a className="dropdown-item" href="/update">Update Info</a>
<a className="dropdown-item" href="/admin">Admin</a> */}