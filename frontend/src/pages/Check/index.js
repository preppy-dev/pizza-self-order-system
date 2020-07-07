import React, { useState, useContext, useEffect } from "react";
import { Link} from "react-router-dom";
import HomeButton from "../../components/HomeButton";
//import Subtract from "../../assets/Subtract.png";
import OneSubtract from "../../assets/OneSubtract.png";
import Plus from "../../assets/Plus.png";
import delect from "../../assets/delect.png";
import "./Check.css";
import { ModelContext } from "../../Context/ModelContext";
import { addToCart, removeFromCart,resetCart } from "../../actions/cartAction";
import { testArray } from "../PizzaSingle";

import { useSelector, useDispatch } from "react-redux";



var cont = 1;

const Check = (props) => {
  const dataIngredient = [
    { name: "Bacon", id: 1 },

    { name: "Mozzarela", id: 2 },
    { name: "Orégano", id: 3 },
    { name: "Ham", id: 4 },
    { name: "Tomato Sauce", id: 5 },
    { name: "Fatias de Tomate", id: 6 },
  ];
  const cart = useSelector((state) => state.cart);
  const [dataIngredients, setDataIngredients] = useState([
    { name: "Bacon", id: 1 },

    { name: "Mozzarela", id: 2 },
    { name: "Orégano", id: 3 },
    { name: "Ham", id: 4 },
    { name: "Tomato Sauce", id: 5 },
    { name: "Fatias de Tomate", id: 6 },
  ]);

  const { cartItems } = cart;
  const [count, setCount] = useState(1);
  const [asssada, setAssada] = useState();
  const [remove, setRemove] = useState();
  const [precoPizzaItem, setPrecoPizzaItem] = useState();

  const { setCurrentModel } = useContext(ModelContext);
  const openModel = () => setCurrentModel({ name: "CheckModal" });
  const redirectFunc = () => (
    
  window.location = "/confirmation"
  )

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const reset = (productId) => {
    dispatch(resetCart(productId));
  };

  const update = (action) => {
    if (action === "increment") {
      setCount(count + 1);
    }
    if (action === "decrement") {
      setCount(count - 1);
    }
  };

  

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  /* 
  cb: () => {
    setNames(names.filter(n => n.id !== id)); */

  const deletes = (id) => {
    //setDataIngredients(dataIngredients.filter((el) => el.id !== id));
  };

  //ASADA FUNCTION
  function testFunc() {
    console.log(cont);
    if (cont === 4) {
      console.log("Entrou");
      cartItems.map((item) =>
        item.ingredients.map((l) => {
          for (let value of testArray) {
            if (value === l._id) {
              var element = document.querySelector("#ing" + l._id);
              element.classList.add("remove");
            }
          }
        })
      );
    }
    cont++;
  }

  function checkUseAsadaConfig() {
    fetch("http://192.168.1.104:4000/api/config/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.assada === 0) {
          setAssada("openModel");
        }

        if (data.precoPizza === 0) {
          setPrecoPizzaItem("precoPizza");
        }
      });
  }
  checkUseAsadaConfig();
  testFunc();
  ///////////////////

  return (
    <div className="Check">

        <div className="TopCheck">
          <h1 className="titlechecks"> Seu pedido </h1>
          <HomeButton/>
          {/* <Link className="return" 
          to="/"
          onClick={() => reset()}
          >
            <img src={HomebtImg} className="" alt="logo" />
          </Link> */}
        </div>
      
      
      <div className="check_main">
        {cartItems.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="onepizzabox">
              <div className="pizzanameandprice">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/${item.category}/${item.image}`
                  }
                  alt="Pizza"
                />
                <div className="pizzanameandpricemain">
                  <h2>{item.sabor}</h2>
                  <h3 className={precoPizzaItem}>{item.price}$R</h3>
                </div>
              </div>

              <ul className="pizzaItemsSelect">
                {item.ingredients.map((el) => (
                  <li className={remove} id={"ing" + el._id} key={el._id}>
                    {el.ingrdientName + ","}
                  </li>
                ))}
              </ul>

              {/* <p className="pizzaItemsSelect">
                Bacon, Mozzarela , Orégano ,Ham ,Tomato Sauce, Fatias de Tomate
              </p> */}

              <button
                value={item.qty}
                onClick={() => {
                  if (count > 1) {
                    update("decrement");
                  }
                }}
                type="button"
                className="btn btn-secondary"
              >
                <img src={OneSubtract} alt="" />
              </button>
              <h1 className="TotalPizzaSelects">{count}</h1>

              <button
                value={item.qty}
                onClick={() => {
                  update("increment");
                }}
                type="button"
                className="btn btn-secondary"
              >
                <img src={Plus} alt="plus" />
              </button>
              <button onClick={() => removeFromCartHandler(item.product)}>
                <img src={delect} alt="delect" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="check_Reorder">
        <Link className="Reorder" to="/select">
          <h1>ADICIONAR OUTRA PIZZA</h1>
        </Link>
        <Link
          onClick={asssada === "openModel" ? openModel : redirectFunc}
          className="Checkvalid"
        >
          <h1>FINALIZAR PEDIDO</h1>
        </Link>
      </div>

      <div className="check_footer">
        <h1 className={`${precoPizzaItem} TotalPrice`}>
          VALOR TOTAL : {(qty * cartItems.length.price).toFixed(2)} $R
        </h1>

        <h1 className="TotalPizza">PIZZA : {cartItems.length}</h1>
      </div>
   
    </div>
  );
};

export default Check;
