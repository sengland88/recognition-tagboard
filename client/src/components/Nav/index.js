import React from "react";

import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" id="navi">
      <img src="./imgs/logo.jpg" className="theLogo" />
      <div className="dropdown" id="theDr">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="/welcome">Welcome</a>
          <a className="dropdown-item" href="/tagboard">Tagboard</a>
          <a className="dropdown-item" href="/search">Search</a>
          <a className="dropdown-item" href="/admin">Admin</a>
        </div>
      </div>   
    </nav>
  );
}

export default Nav;