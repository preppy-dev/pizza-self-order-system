/*
 * action types
 */

import {
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  SAVE_CART,
  RESET_CART,
} from "../constants/constants";

export const actions = {
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  SAVE_CART,
  RESET_CART,
};

/*
 * action creators
 */

const uid = () => Math.random().toString(34).slice(2);

export function addtoCart(product, quantity) {
  return {
    type: actions.ADD_TO_CART,
    payload: { _id: uid(), quantity: quantity, details: product },
  };
}

export function updateCart(_id, quantity) {
  return {
    type: actions.UPDATE_CART,
    payload: { _id: _id, quantity },
  };
}

export function removeFromCart(_id) {
  return {
    type: actions.REMOVE_FROM_CART,
    payload: _id,
  };
}

export function saveCart(pizzas) {
  return {
    type: actions.SAVE_CART,
    payload: { pizzas: pizzas },
  };
}
export function resetCart() {
  return {
    type: actions.RESET_CART,
  };
}
