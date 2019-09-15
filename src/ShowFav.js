import React from "react";
import "./ShowFav.css";

function ShowFav({ arr }) {
  return (
    <div>
      {arr.map(data => {
        const parsedValue = JSON.parse(data);
        console.log(parsedValue);
        return (
          <div className="fav-box">
            <h1 className="box__title">{parsedValue[1]}</h1>
            <li className="box__year">year: {parsedValue[0]}</li>
            <li className="box__id">id: {parsedValue[4]}</li>
            <img
              className="box__img"
              src={parsedValue[2]}
              alt={parsedValue[1]}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ShowFav;
