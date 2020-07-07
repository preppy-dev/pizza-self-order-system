import React, { useContext, useState } from "react";
import { Link,withRouter } from "react-router-dom";
import "./Select.css";
import SabosImg from "../../assets/1sabos.png";
import SaboresImg from "../../assets/2sabores.png";
import returnImg from "../../assets/return.png";
import { OrderListContext } from "../../Context/OrderListContext";

const Select = (props) => {
  const CurrentOrderType = useContext(OrderListContext);
  const [selectItem, setSelectItem] = useState();
  function checkUseSelectConfig() {
    fetch("http://192.168.1.104:4000/api/config/session")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.categoria === 0) {
          setSelectItem("/sabores");
        } else {
          setSelectItem("/tipo");
        }
      });
  }
  checkUseSelectConfig();
  return (
    <div className="Select">
      <div className="selectmain">
        <header className="Select_head">
          <Link className="Selectreturn" onClick={() => props.history.goBack()}>
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
            <Link className="boxselect Sabores2" to={selectItem}>
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
