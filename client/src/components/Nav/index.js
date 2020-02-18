import React from "react";

import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" id="navi">
      <img src="./imgs/logo.jpg" className="theLogo" />
      <div class="dropdown" id="theDr">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="/welcome">Welcome</a>
          <a class="dropdown-item" href="/tagboard">Tagboard</a>
          <a class="dropdown-item" href="/search">Search</a>
          <a class="dropdown-item" href="/admin">Admin</a>
        </div>
      </div>   
    </nav>
  );
}

export default Nav;