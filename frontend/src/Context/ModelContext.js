import React, { createContext, useState } from "react";

export const ModelContext = createContext();

export const ModelContextProvider = props => {
  const [currentModel, setCurrentModel] = useState(null);
  return (
    <ModelContext.Provider value={{ currentModel, setCurrentModel }}>
      {props.children}
    </ModelContext.Provider>
  );
};
