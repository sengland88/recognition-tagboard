import React from "react";
import "./style.css";

function Title(props) {
  return (
    <div className="titleDiv">
      <div className="text-center">
      <p>{props.children}</p>
      </div>
    </div>
  );
}

export default Title;