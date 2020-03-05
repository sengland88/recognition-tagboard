import React from "react";
import "./commentcard.css";

function CommentCard(props) {
  return (
    <div className="card theComments">
      <div className="content">
        <p>{props.department}</p>
        <p>{props.comment}</p>

        <p>Submitter: {props.submitter}</p>

        <p>Submit Date: {props.thedate}</p>
      </div>
    </div>
  );
}

export default CommentCard;
