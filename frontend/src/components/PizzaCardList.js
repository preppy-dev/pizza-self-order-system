import React from "react";
import PizzaCard from "./PizzaCard";

const PizzaCardList = ({ products}) => {
 
  const cardComponent = products.map((pizza) => {
    return (
      <PizzaCard
        key={pizza._id}
        price={pizza.price}
        pizza={pizza}
        sabor={pizza.sabor}
        ingredient={pizza.ingredient}
        category={pizza.category}
        image={pizza.image}
      />
    );
  });
  return <div className="AllSabores">{cardComponent}</div>;
};

export default PizzaCardList;
