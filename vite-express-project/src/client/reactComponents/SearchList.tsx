import React from "react";
import { SearchData } from "../functions/interfaces";

function SearchList({ searchData }: { searchData: SearchData[] }) {
  return searchData.map((element, index) => {
    return (
      <div key={index}>
        <img
          id="photoProfile"
          src={`../../../images/${element.photoProfile}`}
        ></img>
        <div>
          <h1 id="nameProfile" className="profileText">
            {element.name}
          </h1>
          <h2 id="loginProfile" className="profileText">
            @{element.login}
          </h2>
          <p id="bioProfile" className="profileText">
            {element.bio}
          </p>
        </div>
        <button>Подписаться</button>
      </div>
    );
  });
}

export default SearchList;
