import React, { createContext, useState } from "react";


export const OrderListContext = createContext({});

const OrderListContextProvider = props => {
  const [orderList, SetOrderList] = useState({
    prioridade: "normal",
  });

  return (
    <OrderListContext.Provider value={{orderList,SetOrderList}}>
      {props.children}
    </OrderListContext.Provider>
  );
};

export default OrderListContextProvider;
