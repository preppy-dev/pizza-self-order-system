import React, {useContext} from "react";
import { Link } from "react-router-dom";
import confirmationillustration from "../../assets/confirmationillustration.png";
import "./Confirmation.css";
import {resetCart} from "../../actions/cartAction";
import {  useDispatch } from "react-redux";
import { OrderListContext } from "../../Context/OrderListContext";




const Confirmation = () => {
  const CurrentOrderType = useContext(OrderListContext);
  const dispatch = useDispatch();
  const reset = (productId) => {
    dispatch(resetCart(productId));
  };
  return (
    <div className="Confirmation">
      <div className="Confirmationhead">
        <img src={confirmationillustration} alt="" />

        <h1>
          CONFIRMAr O ENVIO DO
          <br />
          PEDIDO PARA Produção ?
        </h1>
      </div>

      <div className="Confirmationbt">
        <Link 
        className="Cancelbt" 
        to="/"
          onClick={() => reset()}
        >
          <h1>CANCELAR</h1>
        </Link>
        <Link className="Confirmarbt" to="/success">
          <h1>CONFIRMAR</h1>
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
