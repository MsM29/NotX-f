import React, { useEffect, useState } from "react";
import { getSubscriptions } from "../functions/api";
import SearchList from "./SearchList";
import Pagination from "./Pagination";

function Subscriptions() {
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    async function subscriptions() {
      const res = await getSubscriptions();
      setSearchData(res.rows);
      setMaxPage(res.maxPage);
    }
    subscriptions();
  }, []);

  async function editPage(value: number) {
    const res = await getSubscriptions(value);
    setPage(value);
    setSearchData(res.rows);
    setMaxPage(res.maxPage);
  }

  return (
    <>
      <div className="w-[900px] h-screen flex flex-col items-center border-x-4 border-[#b6c5cd] max-w-5xl">
        <div id="searchList" className="mt-2 w-full">
          <SearchList searchData={searchData} />
        </div>
        <Pagination page={page} maxPage={maxPage} editPage={editPage} />
      </div>
    </>
  );
}

export default Subscriptions;
