import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Preferential from "./pages/Preferential";
import Select from "./pages/Select";
import Sabores from "./pages/Sabores";
import Tipo from "./pages/Tipo";
import PizzaSingle from "./pages/PizzaSingle";
import Check from "./pages/Check";
import Success from "./pages/Success";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import Profil from "./pages/Profil";

import OrderListContextProvider from "./Context/OrderListContext";
// Modals

import { ModelContextProvider } from "./Context/ModelContext";
import ModalManager from "./components/Modals/ModalManager";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <ModelContextProvider>
          <OrderListContextProvider>
            <ModalManager />
            <Route path="/" exact component={Inicio} />
            <Route path="/Preferential" component={Preferential} />
            <Route path="/Tipo" component={Tipo} />
            <Route path="/Sabores" exact={true} component={Sabores} />
            <Route path="/category/:id" component={Sabores} />
            <Route path="/Select" component={Select} />
            <Route path="/PizzaSingle/:id" component={PizzaSingle} />
            <Route path="/Check/:id?" component={Check} />
            <Route path="/Confirmation" component={Confirmation} />
            <Route path="/Success" component={Success} />
            <Route path="/Login" component={Login} />
            <Route path="/Profil" component={Profil} />
          </OrderListContextProvider>
        </ModelContextProvider>
      </Switch>
    </BrowserRouter>
  );
}
