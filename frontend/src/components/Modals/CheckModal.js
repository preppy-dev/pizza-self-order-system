import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { OrderListContext } from "../../Context/OrderListContext";
import "./CheckModal.css";

export default (props) => {
  function url() {
    window.location = "/confirmation";
  }
  const value = useContext(OrderListContext);
  const { orderType, SetOrderListContext } = value;
  return (
    <div className="CheckitModal">
      <div className="maincheckitmodal">
        <div className="CheckitModalhead">
          <h1>
            Como você deseja sua Pizza : <br />
            Assada ou Não Assada?
          </h1>
        </div>

        <div className="CheckitModalbt">
          <Link
            onClick={(e) => {
              e.preventDefault();
              SetOrderListContext({ [e.target.orderType]: e.target.value });
              url();
            }}
            classN
            className="NoAssabt"
          >
            <h1>NÃO ASSADA</h1>
          </Link>
          <Link
            orderType="Checkit"
            defaultValue="Checkit"
            onClick={(e) => {
              e.preventDefault();
              SetOrderListContext({ [e.target.orderType]: e.target.value });
              url();
            }}
            className="Checkitbt"
          >
            <h1>PIZZA ASSADA</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};
