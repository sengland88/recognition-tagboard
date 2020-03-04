import React, { Children } from "react";
import "./style.css";

export default function Table(props) {
  return <table className="table">{props.children}</table>;
}

export function THead(props) {
  return <thead>{props.children}</thead>;
}

export function THeading(props) {
  return <th>{props.children}</th>;
}

export function TBody(props) {
  return <tbody>{props.children}</tbody>;
}

export function TRow(props) {
  return <tr>{props.children}</tr>;
}

export function TData(props) {
return <td>{props.children}</td>;
}
