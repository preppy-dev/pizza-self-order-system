import React,{useEffect,useState} from "react";
import { Link,withRouter } from "react-router-dom";
import "./Tipo.css";
import returnImg from "../../assets/return.png";
import { listProducts } from "../../actions/productActions";
import TipoCardList from "../../components/TipoCardList";
import {Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import {apiConfig} from "../../services/api"




const Tipo = (props) => {
console.log(props)
 const [state, setstate] = useState([])
  const dispatch = useDispatch();
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  
  useEffect(()=>{
    fetch("http://192.168.1.104:4000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
      setstate (data)
        //setBgImage(data.telaInicial);
        
        //console.log(state)
      });
  },[setstate,state])
 
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
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
          <TipoCardList categories={state}/>

        </div>
      </div>
    </div>
  );
};

export default withRouter(Tipo);
