import React, { useContext } from "react";
import { ModelContext } from "../../Context/ModelContext";
import { Link } from "react-router-dom";
import "./Preferential.css";

const Preferential = () => {
  
 

  const { setCurrentModel } = useContext(ModelContext);
  const openModel = () => setCurrentModel({ name: "PreferentialModal" });
 
  return (
    <div className="Pref">
     
      <Link
        className="bt bt-green"
        to="/select"
        
      >
        <h1> NORMAL </h1>
      </Link>
      
      <Link onClick={openModel} className="bt bt-blue">
        <h1> PREFERENCIAL </h1>
      </Link>
    </div>
  );
};

export default Preferential;
