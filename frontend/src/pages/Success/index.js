import React, { useState } from "react";
import { Link } from "react-router-dom";
import successillustration from "../../assets/successillustration.png";
import "./Success.css";
import {resetCart} from "../../actions/cartAction";

import {  useDispatch } from "react-redux";


const Success = () => {
  const [backgroundImg, setBgImage] = useState();

  const dispatch = useDispatch();
  const reset = (productId) => {
    dispatch(resetCart(productId));
  };

  function checkUseConfigBgsuccess() {
    fetch("http://192.168.1.104:4000/api/config/session")
      .then((res) => res.json())
      .then((data) => {
        //setBgImage(data.telaFinal);
        setBgImage(data.telaFinal);
      });
  }

  checkUseConfigBgsuccess();

  return (
    <div style={{ backgroundImage: backgroundImg }} className="Success">
      <div className="Successhead">
        <img src={successillustration} alt="" />

        <h1>
          SEU PEDIDO FOI FEITO
          <br />
          COM SUCESSO
        </h1>

        <p>
          Retire sua senha e <br />
          AGUARDA PARA SER CHAMADO !
        </p>
      </div>

      <div className="Successbt">
        <Link 
        className="Reordersuccesbt" 
        to="/select"
        onClick={() => reset()}
        >
          <h1>Iniciar Outro Pedido</h1>
        </Link>
        <Link 
        className="exitbt" 
        to="/"
        onClick={() => reset()}
        >
          <h1>NÃO OBRIGADO</h1>
        </Link>
      </div>
    </div>
  );
};

export default Success;
