import React from "react";

export default props => {
  return (
    <div className="modal">
      <span onClick={props.closeModel} className="close">
        X
      </span>
      <p>Dashboard Modal</p>
      <input type="text" placeholder="How are you feeling today?" />
    </div>
  );
};
