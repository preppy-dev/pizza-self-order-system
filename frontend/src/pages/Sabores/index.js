import React, {useState, useEffect,useRef } from "react";
import { Link,withRouter} from "react-router-dom";
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
import { toArray } from "antd/lib/form/util";
import {apiConfig} from "../../services/api"


//import axios from 'axios';

//class Sabores extends React.Component

const Sabores = (props) => {
  console.log(props)
  const dispatch = useDispatch();
  const inputRef = useRef();
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const [productsPerPage, setProductsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const [allProductslist, setallProductslist] = useState([]);
  const [backgroundImg, setBgImage] = useState();
  const [backSatateSelect, setbackSatateSelect] = useState();


/* configuração API */
useEffect(() => {
  fetch(apiConfig)
      .then((res) => res.json())
      .then((data) => {
        //setBgImage(data.telaInicial);
        setBgImage(data.telasabores);
      });
}, [setBgImage])

useEffect(() => {
  fetch(apiConfig)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      if (data.categoria === 1) {
        setbackSatateSelect("/select");
      } else {
        setbackSatateSelect("/tipo");
      }
    });
}, [setbackSatateSelect])

/* configuração API fim */

  useEffect(()=>{
    fetch("http://192.168.1.104:4000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(...toArray(data))
        //setBgImage(data.telaInicial);
        setallProductslist(()=>{
          return [...toArray(data)]
        });
        console.log(allProductslist)
      });
  },[setallProductslist])

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


  //LoadProducts();

  return loading ? (
    <Spin tip="..." indicator={antIcon} />
  ) : error ? (
    <div>{error}</div>
  ) :  (
    
      <div  className="Sabores">
      
        <div style={{ backgroundImage: backgroundImg }} className="sabores_main">
          <div className="TopSabores">
            <h1 className="titlesabores"> Escolha sua pizza </h1>
            <Link className="return" to={backSatateSelect}>
              <img src={returnImg} className="" alt="logo" />
            </Link>
            <HomeButton/>
           
          </div>
          

              
          <PizzaCardList ref={inputRef} products={currentProducts} />
         

          <div >
            <Pagination
            className="saborespagination"
              productsPerPage={productsPerPage}
              onShowSizeChange={setProductsPerPage}
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

export default withRouter(Sabores);
