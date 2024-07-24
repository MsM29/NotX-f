import React, { useState } from "react";
import SearchList from "./SearchList";
import "../styles/searchPage.css";
import { searchUser } from "../functions/api";

function Search() {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    searchUser(searchText, setSearchData);
  }

  return (
    <div className="container">
      <form id="searchForm" onSubmit={search}>
        <input
          placeholder="Введите имя или логин пользователя"
          type="search"
          id="searchInput"
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button type="submit">Поиск</button>
      </form>
      <div id="searchList">
        <SearchList searchData={searchData} />
      </div>
    </div>
  );
}

export default Search;
