import React, { useContext } from "react";
import PizzaSingleModal from "./PizzaSingleModal";
import PreferentialModal from "./PreferentialModal";
import { ModelContext } from "../../Context/ModelContext";
import ConfirmModal from "./ConfirmModal";
import CheckModal from "./CheckModal";
//import PizzaSingle from "../../pages/PizzaSingle";

const Modals = {
  PreferentialModal,
  PizzaSingleModal,
  ConfirmModal,

  CheckModal,
};

const ModalManager = (props) => {
  const { currentModel, setCurrentModel } = useContext(ModelContext);
  const closeModel = () => setCurrentModel(null);

  if (currentModel) {
    const ModelComponent = Modals[currentModel.name];
    return <ModelComponent closeModel={closeModel} {...currentModel.props} />;
  }
  return null;
};

export default ModalManager;
