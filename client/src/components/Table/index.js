import React, { Children } from "react";
import "./style.css";

export function Table({ props }) {
  return (
    <div>
      <table className="table"></table>
    </div>
  );
}

export function TableHead({ props }) {
  return (
    <div>
      <thead></thead>
    </div>
  );
}

export function TableRow({ props }) {
  return (
    <div>
      <tr></tr>
    </div>
  );
}

export function TableHeading({ props, heading }) {
  return (
    <div>
      <th></th>
    </div>
  );
}

export function TableBody({ props }) {
  return (
    <div>
      <th>{Children}</th>
    </div>
  );
}
