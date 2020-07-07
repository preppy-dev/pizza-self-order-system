import React,{useState} from "react"
import {Link} from "react-router-dom"



const TipoCard = () =>{

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

  return(
    <Link className="tipobox" to="/category/Tradicional">
            <div className="Tipo">
              <img src={PizzaImg} className="tipoimage" alt="tipoimage" />
            </div>
            <h1> PIZZA TRADICIONAL </h1>
            <h2 className={precoCategoriaItem}> VALOR : 24 $R </h2>
          </Link>
  )
}

export default TipoCard