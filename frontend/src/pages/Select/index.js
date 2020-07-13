import React, { useContext, useState,useEffect } from "react";
import { Link,withRouter } from "react-router-dom";
import "./Select.css";
import SabosImg from "../../assets/1sabos.png";
import SaboresImg from "../../assets/2sabores.png";
import returnImg from "../../assets/return.png";
import { OrderListContext } from "../../Context/OrderListContext";
import {apiConfig} from "../../services/api"


const Select = (props) => {
  const CurrentOrderType = useContext(OrderListContext);
  const [selectItem, setSelectItem] = useState();
  const [selectItem2, setSelectItem2] = useState();
  const [backSatate, setbackSatate] = useState();

/* configuração API */
  useEffect(() => {
    fetch(apiConfig)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.categoria === 0) {
          setSelectItem("/sabores");
        } else {
          setSelectItem("/tipo");
        }
        if (data.categoria === 0) {
          setSelectItem2("/sabores2");
        } else {
          setSelectItem2("/tipo2");
        }
      });
  }, [setSelectItem,setSelectItem2])
  
  useEffect(() => {
    fetch(apiConfig)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.preferencial === 1) {
          setbackSatate("/preferential");
        } else {
          setbackSatate("/");
        }
      });
  }, [setbackSatate])

  return (
    <div className="Select">
      <div className="selectmain">
        <header className="Select_head">
          <Link className="Selectreturn" to={backSatate}>
            <img src={returnImg} className="" alt="logo" />
          </Link>

          <h1 className="Selectheadh1">Escolha Inteira ou 2 Sabores</h1>
        </header>

        <div className="selects">
          <div className="select_">
            <Link className="boxselect Sabos" to={selectItem}>
              <img src={SabosImg} className="Selecimg" alt="logo" />
            </Link>
            <h2 select_h2> 1 Sabor </h2>
          </div>

          <div className="select_">
            <Link className="boxselect Sabores2" to={selectItem2}>
              <img src={SaboresImg} className="Selecimg" alt="" />
            </Link>
            <h2 select_h2> 2 Sabores </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Select);
