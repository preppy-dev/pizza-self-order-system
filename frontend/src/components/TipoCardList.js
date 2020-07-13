import React from "react";
import TipoCard from "./TipoCard";

const TipoCardList = ({categories})=>{
  const cardComponent = categories.map((type)=>{

    return (<TipoCard 
   key={type.id}
   name={type.categoryName}
   price={type.price}
   routeName={type.routeName}
    image={type.image}
   />
   );
  })
  return <>{cardComponent}</>
}

export default TipoCardList;