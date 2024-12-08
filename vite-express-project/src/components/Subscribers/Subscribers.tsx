import React, { useEffect, useState } from "react";
import { getSubscribers } from "../../shared/api/api";
import SearchList from "../../shared/components/SearchList";
import Pagination from "../../shared/components/Pagination";

function Subscribers() {
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    async function fetchSubscribers() {
      const res = await getSubscribers(0);
      setSearchData(res);
      setMaxPage(Math.ceil(res[0].total_count / 10));
    }
    fetchSubscribers();
  }, []);

  async function editPage(value: number) {
    const page = value - 1;
    const res = await getSubscribers(page);
    setPage(value);
    setSearchData(res);
    setMaxPage(Math.ceil(res[0].total_count / 10));
  }

  return (
    <>
      <div className="max-w-[900px] w-screen min-h-screen h-max flex flex-col items-center border-x-4 border-[#b6c5cd] mt-[61px]">
        <h1 className="text-4xl p-3 bg-[#b6c5cd] w-full text-center">
          Подписчики
        </h1>
        <div id="searchList" className="mt-2 max-w-[900px] w-screen">
          <SearchList searchData={searchData} />
          <Pagination page={page} maxPage={maxPage} editPage={editPage} />
        </div>
      </div>
    </>
  );
}

export default Subscribers;
