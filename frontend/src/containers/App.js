import React from "react";
import Routes from "../routes";

import { connect } from "react-redux";

import { saveCart } from "../../src/actions/cartAction";
import "../global.css";

function App() {
  return <Routes />;
}

const AppContainer = connect(
  function mapStateToProps(state) {
    return { cartItems: state.cartItems };
  },
  function mapDispatchToProps(dispatch) {
    return {
      saveLocalStorage: (cartItems) => dispatch(saveCart(cartItems)),
    };
  }
)(App);

export default AppContainer;
