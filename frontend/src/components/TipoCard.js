import React,{useState} from "react"
import {Link,withRouter} from "react-router-dom"



const TipoCard = ({name,price,routeName,image,history,match}) =>{

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
    
   
    <Link className="tipobox" onClick={() => history.push(`${match.url}/${routeName}`)}>
            <div className="Tipo">
              <img src={process.env.PUBLIC_URL + `/assets/${name}/${image}`} className="tipoimage" alt="tipoimage" />
            </div>
            <h1> PIZZA {name} </h1>
            <h2 className={precoCategoriaItem}> VALOR : $R {price} </h2>
          </Link>
  )
}

export default withRouter(TipoCard);