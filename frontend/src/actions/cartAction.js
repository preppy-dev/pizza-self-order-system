import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  ADD_TO_CART,RESET_CART, SAVE_CART
} from "../constants/cartConstants";
import axios from "axios";
//import Cookie from "js-cookie";

const uid = () => Math.random().toString(34).slice(2);

export function addtoCart(productId, quantity) {
  return {
    type: ADD_TO_CART,
    payload: { _id: uid(), quantity: quantity, item: productId },
  };
}

const addToCart = (productId, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      "http://192.168.1.104:4000/api/products/" + productId
    );
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        _id: uid(),
        product: data._id,
        category: data.category,
        sabor: data.sabor,
        image: data.image,
        price: data.price,
        ingredients: data.ingredients,
        quantity,
      },
    });

    const {
      cart: { cartItems },
    } = getState();
    
    /* Cookie.set("cartItems", JSON.stringify(cartItems)); */
  } catch (error) {}
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

 /*  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems)); */
};

function resetCart() {
  return {
    type: RESET_CART,
  };
}

function saveCart(cartItems) {
  return {
    type: SAVE_CART,
    payload: { cartItems: cartItems },
  };
}

export { addToCart, removeFromCart,resetCart,saveCart };
