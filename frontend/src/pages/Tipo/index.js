import React,{useState} from "react";
import { Link,withRouter } from "react-router-dom";
import "./Tipo.css";
import PizzaImg from "../../assets/pizza1.png";
import returnImg from "../../assets/return.png";

const Tipo = (props) => {

  const [precoCategoriaItem, setPrecoCategoriatem] = useState();

  function checkUsePrecoPizzaCatConfig() {
    fetch("http://192.168.1.104:4000/api/config/session")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.precoCategoria === 0) {
          setPrecoCategoriatem("precoCategoria");
        }
      });
  }
  checkUsePrecoPizzaCatConfig();

  return (
    <div className="TipoBlock">
      <div className="tipo_main">
        <header className="head">
          <Link className="return" to="/select">
            <img src={returnImg} className="" alt="logo" />
          </Link>

          <h1 className="headh1"> Escolha o tipo da pizza </h1>
        </header>

        <div className="tipos">
          <Link className="tipobox" to="/category/Tradicional">
            <div className="Tipo">
              <img src={PizzaImg} className="tipoimage" alt="tipoimage" />
            </div>
            <h1> PIZZA TRADICIONAL </h1>
            <h2 className={precoCategoriaItem}> VALOR : 24 $R </h2>
          </Link>

          <Link className="tipobox" to="/category/Especial">
            <div className="Tipo">
              <img src={PizzaImg} className="tipoimage" alt="tipoimage" />
            </div>
            <h1> PIZZA ESPECIAL </h1>
            <h2 className={precoCategoriaItem}> VALOR : 24 $R </h2>
          </Link>

          <Link className="tipobox" to="/category/Doce">
            <div className="Tipo">
              <img src={PizzaImg} className="tipoimage" alt="tipoimage" />
            </div>
            <h1> PIZZA DOCE </h1>
            <h2 className={precoCategoriaItem}> VALOR : 24 $R </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Tipo);
