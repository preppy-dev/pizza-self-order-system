import { CART_ADD_ITEM, CART_REMOVE_ITEM, RESET_CART, SAVE_CART, ADD_TO_CART } from "../constants/cartConstants";

const saveToLocalStorage = (object) => {
  localStorage.setItem("cartItems", JSON.stringify(object));
};

function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return Object.assign({}, state, {
        cartItems: [...state.cartItems, action.payload],
      });

    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
      
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

      case SAVE_CART:
        saveToLocalStorage(action.payload.cartItems);
        return state;
      case RESET_CART:
      saveToLocalStorage([]);

      return Object.assign({}, state, {
        cartItems: [],
      });
    default:
      return state;
  }
}

export { cartReducer };
