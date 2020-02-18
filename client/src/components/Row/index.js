import React from "react";
import "./style.css";

function Row(props) {
  return <div className={`row${props.fluid ? "-fluid" : ""} text-center theRow`}  {...props} />;
}

export default Row;
