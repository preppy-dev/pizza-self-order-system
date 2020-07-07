import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/Sabores/Sabores.css";

const PizzaCard = ({ sabor, price, category, image, ingredients, pizza }) => {
  const [precoPizzaItem, setPrecoPizzaItem] = useState();

  function checkUsePrecoPizzaCatConfig() {
    fetch("http://192.168.1.104:4000/api/config/session")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.precoPizza === 0) {
          setPrecoPizzaItem("precoPizza");
        }
      });
  }
  checkUsePrecoPizzaCatConfig();

  return (
    <Link className="pizzacard no-underline" to={"/pizzasingle/" + pizza._id}>
      <div className="center bg-white b--black-10">
        <div className="tc">
          <img
            className="br-100 h4 w4 dib pa"
            alt={image}
            src={process.env.PUBLIC_URL + `/assets/${category}/${image}`}
          />
          <h1 style={{ color: "#000" }}>{sabor}</h1>
          <h2 className={precoPizzaItem}>{price} - R$</h2>
        </div>
      </div>
    </Link>
  );
};

export default PizzaCard;
