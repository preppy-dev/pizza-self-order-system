import React from "react";
import { Link } from "react-router-dom";
import returnImg from "../../assets/return.png";
import HomebtImg from "../../assets/homebotton.png";

const Check = ({ pizza }) => {
  const [setCount] = useState(1);

  return (
    <div className="Check">
      <div className="Check_main">
        <div className="TopCheck">
          <h1 className="titlechecks"> Remova itens </h1>
          <Link className="return" to="/sabores">
            <img src={returnImg} className="" alt="logo" />
          </Link>
          <Link className="return" to="/">
            <img src={HomebtImg} className="" alt="logo" />
          </Link>
        </div>
      </div>

      <div className="items_main">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sequi
        mollitia, sint sit unde nihil nobis in tenetur accusamus nulla expedita
        quod tempore velit repudiandae culpa id, deleniti alias adipisci.
      </div>

      <div className="iems_footer">
        <h2>{pizza.name}</h2>
        <h2>{pizza.price}</h2>
        <Link className="Checkvalid" to="/confirmation">
          <h1>ESCOLHER</h1>
        </Link>
      </div>
    </div>
  );
};

export default Check;
