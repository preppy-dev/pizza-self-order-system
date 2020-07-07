import React, { Fragment, useState, useEffect, useMemo } from "react";
import { Link} from "react-router-dom";
import PizzaCardList from "../../components/PizzaCardList";
import HomeButton from "../../components/HomeButton";
import { listProducts } from "../../actions/productActions";
//import Pagination from "../../components/Pagination";
import { Pagination, Spin } from "antd";
import { DownOutlined, UpOutlined, LoadingOutlined } from "@ant-design/icons";
import "tachyons";
import "./Sabores.css";
import returnImg from "../../assets/return.png";
import { useSelector, useDispatch } from "react-redux";

//import axios from 'axios';

const Sabores = (props) => {
  const dispatch = useDispatch();
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const [productsPerPage, setProductsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const [backgroundImg, setBgImage] = useState();

  function checkUseConfig() {
    fetch("http://192.168.1.104:4000/api/config/session")
      .then((res) => res.json())
      .then((data) => {
        //setBgImage(data.telaInicial);
        setBgImage(data.telasabores);
      });
  }

  useEffect(() => {
    dispatch(listProducts(category));
  }, [category, dispatch, currentPage, productsPerPage]);
  // Get current posts
  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProducts,
    indexOfLastProducts
  );

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // Change page
  function itemRender(currentPage, type, originalElement) {
    if (type === "prev") {
      return <UpOutlined />;
    }
    if (type === "next") {
      return <DownOutlined />;
    }
    return originalElement;
  }

  checkUseConfig();

  return loading ? (
    <Spin tip="..." indicator={antIcon} />
  ) : error ? (
    <div>{error}</div>
  ) : (
    
      <div  className="Sabores">
        <div style={{ backgroundImage: backgroundImg }} className="sabores_main">
          <div className="TopSabores">
            <h1 className="titlesabores"> Escolha sua pizza </h1>
            <Link className="return" to="/tipo">
              <img src={returnImg} className="" alt="logo" />
            </Link>
            <HomeButton/>
            {/* <Link className="return" to="/"
            onClick={() => reset()}
            >
              <img src={HomebtImg} className="" alt="logo" />
            </Link> */}
          </div>
      
          <PizzaCardList products={ currentProducts}/>

          <div >
            <Pagination
            className="saborespagination"
              //productsPerPage={productsPerPage}
              //onShowSizeChange={setProductsPerPage}
              simple
              total={products.length}
              defaultCurrent={currentPage}
              itemRender={itemRender}
              onChange={setCurrentPage}
              hideOnSinglePage
            />
          </div>
        </div>
      </div>
   
  );
};

export default Sabores;
