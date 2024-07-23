import React, { useState, useEffect } from "react";
import ReactDOMClient from "react-dom/client";
import SearchList from "./SearchList";
import "../styles/searchPage.css";

function Search() {
  const [searchText, setSearchText] = useState("");
  let [searchList, setSearchList] = useState<ReactDOMClient.Root | null>(null);

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`/search?user=${searchText}`)
      .then(async (res) => {
        if (res.status === 200) {
          const searchData = await res.json();
          if (!searchList)
            setSearchList(
              ReactDOMClient.createRoot(document.querySelector("#searchList")!)
            );
          else searchList.render(<SearchList searchData={searchData} />);
        } else {
          alert("Ошибка при выполнении запроса!");
        }
      })
      .catch((error) => {
        console.error("Ошибка запроса:", error);
        alert("Произошла ошибка при выполнении запроса.");
      });
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
      <div id="searchList"></div>
    </div>
  );
}

export default Search;
