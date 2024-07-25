import React from "react";
import { SearchData } from "../functions/interfaces";

function SearchList({ searchData }: { searchData: SearchData[] }) {
  return searchData.map((element, index) => {
    return (
      <div key={index} className="flex flex-row mb-2 justify-around items-center w-full">
        <img
          id="photoProfile"
          className="w-64 h-64 object-cover border-4 border-[#b6c5cd] rounded-full"
          src={`../../../images/${element.photoProfile}`}
        ></img>
        <div className="w-4/12">
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
        <button className="h-min w-4/12 bg-blue-200 leading-10 text-gray-950 rounded-md border text-center border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white ">Подписаться</button>
      </div>
    );
  });
}

export default SearchList;
