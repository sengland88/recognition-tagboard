import React from "react";
import "./style.css";

function Container(props) {
  return <div className={`container${props.fluid ? "-fluid" : ""} theContainer`} {...props} />;
}

export default Container;
