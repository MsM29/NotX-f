import React, { useEffect, useState } from "react";
import { getSubscribers } from "../functions/api";
import SearchList from "./SearchList";

function Subscribers() {
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    async function subscribers() {
      const res = await getSubscribers();
      setSearchData(res);
    }
    subscribers();
  }, []);
  return (
    <>
      <div className="w-[900px] h-screen flex flex-col items-center border-x-4 border-[#b6c5cd] max-w-5xl">
        <div id="searchList" className="mt-2 w-full">
          <SearchList searchData={searchData} />
        </div>
      </div>
    </>
  );
}

export default Subscribers;
