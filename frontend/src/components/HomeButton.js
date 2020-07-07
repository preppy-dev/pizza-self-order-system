import React from "react";
import { Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import HomebtImg from  "../assets/homebotton.png"
import {resetCart} from "../actions/cartAction"

const HomeButton = () => {
  const dispatch = useDispatch();
  const reset = (productId) => {
    dispatch(resetCart(productId));
  };
  return(
      <Link 
      className="" 
      to="/"
      onClick={() => reset()}
      >
          <img src={HomebtImg} className="" alt="logo" />
      </Link>
  )
}

export default HomeButton;