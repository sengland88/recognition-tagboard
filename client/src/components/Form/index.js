import React from "react";
import "./style.css";

// This file exports the Input, TextArea, and FormBtn components

export function Input({ type, classes, placeholder, ...other }) {
  return <input type={type} className={"form-control " + (classes ? classes : "")} placeholder={placeholder}
  {...other} />;
}

export function TextArea({ type, classes, placeholder, rows, ...other }) {
  return <textarea type={type} className={"form-control " + (classes ? classes : "")} placeholder={placeholder} rows={rows}
  {...other} />;
}

export function Dropdown({ type, classes, placeholder, rows, children, value, ...other }) {
  return <select className={"form-control " + (classes ? classes : "")}
  {...other} > {children} </select>
}

export function Option({ text, value }) {
  return <option value={value}> {text} </option>;
}

export function Label({ text }) {
  return <label> {text} </label>;
}

export function Small({ text, classes }) {
  return <small className={classes}> {text} </small>;
}

export function FormGroup({ children }) {
  return <div className="form-group"> {children} </div>;
}

export function FormBtn({text, classes, ...rest}) {
    return <button className={`btn ${classes}`} {...rest}>{text}</button>;
}
