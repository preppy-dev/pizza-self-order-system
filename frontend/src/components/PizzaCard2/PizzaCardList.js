import React,{useRef} from "react";
import PizzaCard from "./PizzaCard";

const PizzaCardList = ({products}) => {
  const inputRef = useRef();
  return(
    <div className="AllSabores">
    {products.map((product ) => (
      <PizzaCard ref={inputRef} 
      key={product._id}
      sabor = {product.sabor} 
      price = {product.price} 
      id = {product._id} 
      category = {product.category} 
      image = {product.image} 
      />
    ))}
  </div>
  )
};

export default PizzaCardList;
