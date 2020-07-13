import axios from "axios";

const {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_TYPE_FAIL,
  PRODUCT_LIST_TYPE_REQUEST,
  PRODUCT_LIST_TYPE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  
} = require("../constants/productConstants");

const listProducts = (category = "") => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      "http://192.168.1.104:4000/api/products?category=" + category
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};
const listProductsType = (category = "") => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_TYPE_REQUEST });
    const { data } = await axios.get(
      "http://192.168.1.104:4000/api/products?category=" + category
    );
    dispatch({ type: PRODUCT_LIST_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_TYPE_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(
      "http://192.168.1.104:4000/api/products/" + productId
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

export { listProducts, detailsProduct,listProductsType };
