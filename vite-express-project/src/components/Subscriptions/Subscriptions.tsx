import React, { useEffect, useState } from "react";
import { getSubscriptions } from "../../shared/api/api";
import SearchList from "../../shared/components/SearchList";
import Pagination from "../../shared/components/Pagination";

function Subscriptions() {
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    async function fetchSubscriptions() {
      const res = await getSubscriptions(0);
      if (res.status === 200) {
        const data = await res.json();
        setSearchData(data);
        setMaxPage(Math.ceil(data[0].total_count / 10));
      }
    }
    fetchSubscriptions();
  }, []);

  async function editPage(value: number) {
    const page = value - 1;
    const res = await getSubscriptions(page);
    if (res.status === 200) {
      const data = await res.json();
      setPage(value);
      setSearchData(data);
      setMaxPage(Math.ceil(data[0].total_count / 10));
    }
  }

  return (
    <>
      <div className="max-w-[900px] w-screen min-h-screen h-max flex flex-col items-center border-x-4 border-[#b6c5cd] mt-[61px]">
        <h1 className="text-4xl p-3 bg-[#b6c5cd] w-full text-center">
          Подписки
        </h1>
        <div id="searchList" className="mt-2 max-w-[900px] w-screen">
          <SearchList searchData={searchData} />
        </div>
        <Pagination page={page} maxPage={maxPage} editPage={editPage} />
      </div>
    </>
  );
}

export default Subscriptions;
