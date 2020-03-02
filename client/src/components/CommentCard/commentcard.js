import React from "react";
import "./commentcard.css";

function CommentCard(props) {
  return (
    <div className="card theComments">
      {/* <div className="img-container">
        <img alt={props.name} src={props.image} />
      </div> */}
      <div className="content">
        <p>{props.comment}</p>

        <p>Submitter: {props.submitter}</p>

        <p>Submit Date: {props.thedate}</p>
      </div>
    </div>
  );
}

export default CommentCard;
