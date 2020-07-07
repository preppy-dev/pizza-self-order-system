import React, { useContext } from "react";
import { Link } from "react-router-dom";
import preferentialillustration from "../../../src/assets/preferentialillu.png";
import { OrderListContext } from "../../Context/OrderListContext";
import "./PreferentialModal.css";

export default (props) => {
  function url() {
    window.location = "/select";
  }
  const value = useContext(OrderListContext);
  const { orderType, SetOrderListContext } = value;
  return (
    <div className="PreferentialModal">
      <div className="mainprefmodal">
        <div className="PreferentialModalhead">
          <img src={preferentialillustration} alt="" />

          <h1>confirme por favor</h1>
        </div>

        <div className="PreferentialModalbt">
          <Link onClick={props.closeModel} className="Cancelbt">
            <h1>NÃO</h1>
          </Link>
          <Link
            orderType="Preferential"
            defaultValue="Preferential"
            onClick={(e) => {
              e.preventDefault();
              SetOrderListContext({ [e.target.orderType]: e.target.value });
              url();
            }}
            className="Confirmarbt"
            to="/success"
          >
            <h1>SIM</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};
