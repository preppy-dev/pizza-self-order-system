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

const saveToLocalStorage = (object) => {
  localStorage.setItem("products", JSON.stringify(object));
};

const initialState = {
  products:
    JSON.parse(localStorage.getItem("products")) !== null
      ? JSON.parse(localStorage.getItem("products"))
      : [],
};

export default function onlineStoreApp(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TO_CART:
      return Object.assign({}, state, {
        products: [...state.products, action.payload],
      });
      
    case actions.UPDATE_CART:
      return Object.assign({}, state, {
        products: state.products.map((product) => {
          return product.id === action.payload.id
            ? Object.assign({}, product, {
                quantity: action.payload.quantity,
              })
            : product;
        }),
      });

    case actions.REMOVE_FROM_CART:
      return Object.assign({}, state, {
        products: state.products.filter((product) => {
          // eslint-disable-next-line eqeqeq
          return product.id != action.payload;
        }),
      });

    case actions.SAVE_CART:
      saveToLocalStorage(action.payload.products);
      return state;

    case actions.RESET_CART:
      saveToLocalStorage([]);

      return Object.assign({}, state, {
        products: [],
      });

    default:
      return state;
  }
}
