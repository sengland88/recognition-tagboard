import React from "react";
import "./commentcard.css";

function CommentCard(props) {
  return (
    <div className="card theComments">
      <div className="card-header theHeader"><h5>{props.department}</h5></div>
      <div className="card-body">
        <p className="card-text">{props.comment}</p>
      </div>
        <div className="card-footer" id="theFooter"></div>
        <p className="card-text">Submitter: {props.submitter}</p>
        <small className="text-muted">Submit Date: {props.thedate}</small>
    </div>
  );
}

export default CommentCard;
