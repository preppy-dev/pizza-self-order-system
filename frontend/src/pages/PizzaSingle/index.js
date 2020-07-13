import React, { useState, useEffect, useContext} from "react";
import { Link,withRouter } from "react-router-dom";
import { detailsProduct } from "../../actions/productActions";
import { addtoCart } from "../../actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import returnImg from "../../assets/return.png";
import { CheckIngredientContext } from "../../Context/IngredientContext";
import "./PizzaSingle.css";
import { toArray } from "antd/lib/form/util";
import { Checkbox } from "antd";
import HomeButton from "../../components/HomeButton";
import {apiConfig} from "../../services/api"


//import "antd/dist/antd.css";


var cont = 1;
export const testArray = [];


const PizzaSingle = (props) => {
  console.log(props)
  //const checkIngredient = useContext(CheckIngredientContext);
  const value = useContext(CheckIngredientContext);
 /*  const { checked, SetCheckIngredientContext } = value; */
  const [ checkedState, SetcheckedState ] =  useState({checked:true});

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const [precoPizzaItem, setPrecoPizzaItem] = useState();

  const [checkValue, SetcheckValue] = useState();
  

  const [qty, setQty] = useState(1);
  const quantyDefaut = () => {
    return setQty + 1;
  };
  quantyDefaut();

  const [ing, setIng] = useState({});
  const dispatch = useDispatch();




  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [props.match.params.id, dispatch]);

  const handleAddtoCart = () => {
    props.history.push("/check/" + props.match.params.id + "?qty=" + qty);
  };

  const add = (product, quantity, checkValue) => {
    props.history.push("/check/" + props.match.params.id);
    dispatch(addtoCart(product, quantity, checkValue));
  };
  

  /* function setArrayIngredients(){
     if (cont === 5){
      //console.log([...toArray(product)])
       [...toArray(product.ingredients)].map((item) => 
      
          testArray.push({
            name: item.ingrdientName,
            id: item._id,
          })  
         
        ); 
        console.log(testArray);
    } 
    cont++;
  } */

  useEffect(() => {
    fetch(apiConfig)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.precoPizza === 0) {
          setPrecoPizzaItem("precoPizza");
        }
        
      });
  }, [setPrecoPizzaItem])
  
  function onChangeHandler(e) {
    /* console.log(testArray);
    console.log(e.target); */
    let data = testArray.filter((ing) => {
      return ing.id === e.target.id;
    })
    console.log(data);
    
    let index = testArray.indexOf(data);
    testArray.splice(index, 1);
    //SetcheckedState({checked:e.target.checked})
    //console.log('checked = ', e);
    //checked=[e.target.checked]
    //let target = [...e.target]
    //target.checked
    //console.log(testArray)
    //testArray.push(e.target.id);
    console.log(index);
  }

  //setArrayIngredients();
 
  //console.log([...toArray(product)])
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    
    <div style={{backgroundImage:product.bgImage}} className="Single">
      
      <header className="TopSingle">
        <h1 className="titlesingles"> Remova itens </h1>
        <Link className="return" onClick={()=>{props.history.goBack();}}>
          <img src={returnImg} className="" alt="logo" />
        </Link>
        <HomeButton/>
      </header>
      
      <form className="items_main"  >
      
        {[...toArray(product.ingredients)].map((ingredient) => (
        
          <div key={ingredient._id} className="itembox">
            
            <div className="Imgprofile">
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/assets/ingredients/${ingredient.image}`
                }
                alt="icon"
              />
            </div>
            <div>
              <h1>{ingredient.ingrdientName}</h1>
            </div>
            
            <Checkbox id={ingredient._id} defaultChecked value={ingredient.ingrdientName} onChange={onChangeHandler}/>
              
              {/* <Checkbox onChange={onChange}  value={ingredient}></Checkbox> */}
           
          </div>
        ))}
        
      </form>

      <div className="items_footer">
        <h1 className="productsaborname">{product.sabor}</h1>
        <h2 className={precoPizzaItem}>{product.price} $R</h2>
        <Link 
        type="submit"
          to={"/check/" + props.match.params.id + "?qty=" + qty}
          className="validItems"
        >
          <h1>ESCOLHER</h1>
        </Link>
      </div>
    </div>
  );
};


export default withRouter(PizzaSingle);