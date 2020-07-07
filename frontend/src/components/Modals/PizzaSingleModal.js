import React from "react";

export default (props) => {
  return (
    <div className="PizzaSingleModal">
      <span onClick={props.closeModel} className="close">
        X
      </span>
      <p>Contacts Modal</p>
      <button>See Contacts</button>
    </div>
  );
};
