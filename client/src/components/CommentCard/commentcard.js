import React from "react";
import "./commentcard.css";
import moment from "moment";

function formatDate(date) {

  let sliceDate = date.slice(0, 10)

  return moment(sliceDate).format("MMMM Do YYYY")
}



function CommentCard(props) {
  return (
    <div className="card theComments">
      <div className="card-header theHeader">
        <h5>{props.department}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">{props.comment}</p>
      </div>
      <div className="card-footer" id="theFooter">
        <p className="card-text">Submitter: {props.submitter}</p>
        <small className="text-muted">Submit Date: {formatDate(props.thedate)}</small>
      </div>
    </div>
  );
}

export default CommentCard;
