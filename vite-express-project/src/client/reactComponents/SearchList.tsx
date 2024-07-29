import { UserData } from "../functions/interfaces";
import { Link } from "react-router-dom";
import React from "react";

function SearchList({ searchData }: { searchData: UserData[] }) {
  return searchData.map((element, index) => {
    return (
      <div
        key={index}
        className="flex flex-row mb-2 p-3 justify-around items-center w-full"
      >
        <img
          id="photoProfile"
          className="w-64 h-64 object-cover border-4 border-[#b6c5cd] rounded-full"
          src={`../../../mediaProfile/profilePhoto/${element.login}.png`}
        ></img>
        <div className="w-4/12 p-3">
          <Link to={`user?user=${element.login}`}>
            <h1 id="nameProfile" className="text-3xl">
              {element.name}
            </h1>
          </Link>
          <h2 id="loginProfile" className="text-2xl">
            @{element.login}
          </h2>
          <p id="bioProfile" className="profileText">
            {element.bio}
          </p>
        </div>
        <button className="h-min w-4/12 bg-blue-200 leading-10 text-gray-950 rounded-md border text-center border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white ">
          Подписаться
        </button>
      </div>
    );
  });
}

export default SearchList;
