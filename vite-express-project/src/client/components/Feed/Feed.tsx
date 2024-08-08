import React, { useEffect, useState } from "react";
import { getFeed } from "../../shared/api/api";
import { FeedData } from "../../shared/interface/interfaces";
import Publication from "../../shared/components/Publication";
import Pagination from "../../shared/components/Pagination";

function Feed() {
  const [feed, setFeed] = useState<FeedData[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    async function fetchFeed() {
      const res = await getFeed(0);
      setFeed(res);
      setMaxPage(Math.ceil(res[0].total_count / 10));
    }
    fetchFeed();
  }, []);

  async function editPage(value: number) {
    const page = value - 1;
    const res = await getFeed(page);
    setPage(value);
    setFeed(res);
    setMaxPage(Math.ceil(res[0].total_count / 10));
  }

  return (
    <>
      <div className="max-w-5xl w-[900px] h-full flex flex-col  border-x-4 border-[#b6c5cd]">
        {feed.map((element: FeedData) => (
          <Publication
            key={element.id_post}
            publication={element}
            updatePage={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}
      </div>
      <Pagination page={page} maxPage={maxPage} editPage={editPage} />
    </>
  );
}

export default Feed;
