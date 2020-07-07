import React from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";
import Homebtiinit from "../../assets/btinicio.png";

import { useState } from "react";

const App = (props) => {
  const [pref, setPref] = useState();
  const [backgroundImg, setBgImage] = useState();

  function checkUseConfig() {
    fetch("http://192.168.1.104:4000/api/config/session")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.preferencial === 1) {
          setPref("/preferential");
        } else {
          setPref("/select");
        }
        console.log(data.telaInicial);

        //setBgImage(data.telaInicial);
        setBgImage(data.telaInicial);
      });
  }


  checkUseConfig();
  return (
    <div style={{ backgroundImage: backgroundImg }} className="App">
      <h1>
        Peça já <br /> sua Pizza!
      </h1>

      <Link
        className="initbtbg"
        //to={checkoutHandler === 1 ? "/select" : "/preferential"}
        to={pref}
      >
        <img src={Homebtiinit} className="App-btn-strart" alt="logo" />
      </Link>

      <p className="IniciarP">Toque Para Iniciar</p>
    </div>
  );
};

export default App;
