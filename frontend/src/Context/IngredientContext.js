import React, { createContext, useState } from "react";

export const CheckIngredientContext = createContext({
  checked: [],

  SetCheckIngredientContext: (info) => {},
});

const CheckIngredientContextProvider = ({ children }) => {
  const CheckIngredientState = {
    checked: [],
    SetCheckIngredientContext: (info) =>
      SetCheckIngredient((prevState) => ({
        ...prevState,
        [Object.keys(info)]: Object.values(info)[0],
      })),
  };

  const [checkIngredient, SetCheckIngredient] = useState(CheckIngredientState);
  return (
    <CheckIngredientContext.Provider value={checkIngredient}>
      {children}
    </CheckIngredientContext.Provider>
  );
};

export default CheckIngredientContextProvider;
