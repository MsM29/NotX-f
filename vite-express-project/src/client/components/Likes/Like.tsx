import React, { useEffect, useState } from "react";
import SearchList from "../../shared/components/SearchList";
import Pagination from "../../shared/components/Pagination";
import { getLikeUsers } from "../../shared/api/api";

function Like({ post }: { post: number }) {
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    async function fetchLikes() {
      const res = await getLikeUsers(post, 0);
      setSearchData(res);
      setMaxPage(Math.ceil(res[0].total_count / 10));
    }
    fetchLikes();
  }, []);

  async function editPage(value: number) {
    const page = value - 1;
    const res = await getLikeUsers(post, page);
    setPage(value);
    setSearchData(res);
    setMaxPage(Math.ceil(res[0].total_count / 10));
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

export default Like;
