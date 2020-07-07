import React from "react";

export default props => {
  return (
    <div className="modal">
      <span onClick={props.closeModel} className="close">
        X
      </span>
      <p>{props.title}</p>
      <button onClick={props.closeModel}>No</button>
      <button onClick={props.cb}>Yes</button>
    </div>
  );
};
