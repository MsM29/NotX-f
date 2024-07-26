import React, { useState } from "react";
import SearchList from "./SearchList";
import { searchUser } from "../functions/api";

function Search() {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    searchUser(searchText, setSearchData);
  }

  return (
    <>
      <div className="w-[900px] h-screen flex flex-col items-center border-x-4 border-[#b6c5cd]">
        <form
          id="searchForm"
          className="mb-2 p-4 flex flex-col justify-between w-full items-center border-y-4 border-[#b6c5cd]"
          onSubmit={search}
        >
          <input
            placeholder="Введите имя или логин пользователя"
            type="search"
            id="searchInput"
            className="mb-2 w-full p-2 box-border border border-gray-5e px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button
            type="submit"
            className="h-min w-4/12 bg-blue-200 leading-10 text-gray-950 rounded-md border text-center border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white "
          >
            Поиск
          </button>
        </form>
        <div id="searchList" className="mt-2 w-full">
          <SearchList searchData={searchData} />
        </div>
      </div>
    </>
  );
}

export default Search;
