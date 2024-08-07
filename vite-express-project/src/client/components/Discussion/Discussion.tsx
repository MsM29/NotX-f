import React, { useEffect, useState } from "react";
// import Pagination from "./Pagination";
import { getPost, postComment, getComments } from "../../shared/api/api";
import Publication from "../../shared/components/Publication";
import { FeedData } from "../../shared/interface/interfaces";
import Comment from "./Comment";
import Pagination from "../../shared/components/Pagination";

function Discussion({ post }: { post: number }) {
  const [publication, setPublication] = useState<FeedData[]>([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File[]>([]);
  const [comments, setComments] = useState<FeedData[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    async function fetchPublication() {
      const res = await getPost(post);
      setPublication(res);
    }
    fetchPublication();
    fetchComments();
  }, []);

  async function editPage(value: number) {
    const page = value - 1;
    const res = await getComments(post, page);
    setPage(value);
    setComments(res);
    setMaxPage(Math.ceil(res[0].total_count / 10));
  }

  async function makeComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = JSON.stringify({ text, post });
    await postComment(data, file);
    await fetchComments();
    setText("");
  }

  async function fetchComments() {
    const res = await getComments(post, 0);
    setComments(res);
    setMaxPage(Math.ceil(res[0].total_count / 10));
  }

  return (
    <>
      <div className="w-[900px] h-max flex flex-col items-center border-x-4 border-[#b6c5cd] max-w-5xl">
        <div id="myPageFeed" className="max-w-7xl w-[900px]">
          {publication.map((element: FeedData) => (
            <Publication
              key={element.id_post}
              publication={element}
              updatePage={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
        </div>
        <div id="myPageFeed" className="max-w-7xl w-[700px]">
          {comments.map((element: FeedData) => (
            <Comment key={element.id_comment} publication={element} />
          ))}
        </div>
        <Pagination page={page} maxPage={maxPage} editPage={editPage} />
        <form
          id="creatingPost"
          className="flex justify-center mt-3 items-center flex-col w-full pb-2 "
          onSubmit={makeComment}
        >
          <textarea
            id="inputPost"
            className="mt-2 h-24 w-11/12 p-1 mb-2 resize-none rounded-xl"
            placeholder="Что думаете?"
            value={text}
            onChange={(event) => setText(event.target.value)}
            maxLength={280}
          />
          <div
            id="listPostButtons"
            className="flex items-center justify-evenly w-11/12 gap-1"
          >
            <input
              type="file"
              className=" w-6/12 bg-blue-200 text-center leading-10 text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white"
              accept="video/*, image/*"
              onChange={(event) =>
                setFile(Array.from(event.target.files || []))
              }
            />
            <button
              className="w-6/12 h-[62.5px] bg-blue-200 text-center leading-10 text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white"
              type="submit"
            >
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Discussion;
