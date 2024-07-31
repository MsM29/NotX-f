import React, { useEffect, useState } from "react";
import { getFeed } from "../functions/api";
import { FeedData } from "../functions/interfaces";
import UserPublication from "./UserPublication";
import Pagination from "./Pagination";

function Feed() {
  const [feed, setFeed] = useState<FeedData[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    async function feedFunc() {
      const res = await getFeed();
      setFeed(res.rows);
      setMaxPage(res.maxPage);
    }
    feedFunc();
  }, []);

  async function editPage(value: number) {
    const res = await getFeed(value);
    setPage(value);
    setFeed(res.rows);
    setMaxPage(res.maxPage);
  }

  return (
    <>
      <div className="flex flex-col justify-center border-x-4 border-[#b6c5cd] max-w-5xl">
        {feed.map((element: FeedData) => (
          <UserPublication key={element.id_post} publication={element} />
        ))}
      </div>
      <Pagination page={page} maxPage={maxPage} editPage={editPage}/>
    </>
  );
}

export default Feed;
