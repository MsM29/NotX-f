import React, { useState } from "react";
import SearchList from "../../shared/components/SearchList";
import { searchUser } from "../../shared/api/api";
import Pagination from "../../shared/components/Pagination";
import ErrorAlert from "../../shared/components/ErrorAlert";

function Search() {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [dialogErrorText, setDialogErrorText] = useState("");

  async function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await searchUser(searchText, 0);
    if (res.status === 200) {
      const resServer = await res.json();
      setSearchData(resServer);
      setMaxPage(Math.ceil(resServer[0].total_count / 10));
    } else {
      setDialogErrorText("unknown");
    }
  }

  async function editPage(value: number) {
    const page = value - 1;
    const res = await searchUser(searchText, page);
    setPage(value);
    if (res.status === 200) {
      const resServer = await res.json();
      setSearchData(resServer);
      setMaxPage(Math.ceil(resServer[0].total_count / 10));
    }
  }

  return (
    <>
      <ErrorAlert dialogText={dialogErrorText} />
      <div className="max-w-[900px] w-screen min-h-screen h-max flex flex-col items-center border-x-4 border-[#b6c5cd] mt-[61px]">
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
        <div id="searchList" className="mt-2 max-w-[900px] w-screen">
          <SearchList searchData={searchData} />
        </div>
        <Pagination page={page} maxPage={maxPage} editPage={editPage} />
      </div>
    </>
  );
}

export default Search;
