import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import PizzaCardList from "../../components/PizzaCardList";
import { list } from "../../services/data.js";
import "tachyons";
import "./Sabores.css";
import returnImg from "../../assets/return.png";
import HomebtImg from "../../assets/homebotton.png";

const PizzaTradicionais = (props) => {
  const [pageSize, setPageSize] = useState(8);
  const [current, SetCurrent] = useState(1);

  const paginatedPizzas = useMemo(() => {
    const lastIndex = current * pageSize;
    const firstIndex = lastIndex - pageSize;
    return list[0].slice(firstIndex, lastIndex);
  }, [current, pageSize, list[0]]);

  useEffect(() => {
    return window.scroll({
      top: 90,
      left: 0,
      behavior: "smooth",
    });
  }, [current, pageSize]);
  return (
    <Fragment>
      <div className="Sabores">
        <div className="sabores_main">
          <div className="TopSabores">
            <h1 className="titlesabores"> Escolha sua pizza </h1>
            <Link className="return" to="/tipo">
              <img src={returnImg} className="" alt="logo" />
            </Link>
            <Link className="return" to="/">
              <img src={HomebtImg} className="" alt="logo" />
            </Link>
          </div>

          <PizzaCardList pizzas={paginatedPizzas} />
          <div className="saborespagination">
            <Pagination
              simple
              showSizeChanger
              onShowSizeChange={setPageSize}
              pageSize={pageSize}
              total={list[0].length}
              onChange={SetCurrent}
              defaultPageSize={pageSize}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PizzaTradicionais;
