import React, { useEffect, useState } from "react";
import { getMedia, deleteP, sendLike } from "../functions/api";
import { FeedData } from "../functions/interfaces";
import { useLocation } from "react-router-dom";

function UserPublication({
  publication,
  updatePage,
}: {
  publication: FeedData;
  updatePage: () => void;
}) {
  const [media, setMedia] = useState(<></>);
  const [likes, setLikes] = useState(publication.likes_count);
  const date = new Date(publication.date).toLocaleString("ru");
  const location = useLocation();

  useEffect(() => {
    async function mediaFunc() {
      const data = JSON.stringify({ id_post: publication.id_post });
      const res = await getMedia(data);
      if (res.length !== 0) {
        if (res[0].format === "image")
          setMedia(
            <img
              className="w-full object-cover rounded-xl"
              src={`../../../mediaPublication/${res[0].media_name}`}
            ></img>,
          );
        else
          setMedia(
            <video
              className="w-full object-cover rounded-xl"
              src={`../../../mediaPublication/${res[0].media_name}`}
              controls
              autoPlay
              muted
            ></video>,
          );
      }
    }
    mediaFunc();
  }, []);

  async function deletePublication() {
    const res = await deleteP(publication.id_post);
    if (res.status !== 200) alert("Ошибка при удалении!");
    else updatePage();
  }

  async function like() {
    const res = await sendLike(publication.id_post);
    if (res.message === "put") {
      setLikes(likes + 1);
    } else if (res.message === "remove") {
      setLikes(likes - 1);
    }
  }

  return (
    <div className="flex flex-row p-2">
      <img
        className="w-24 h-24 object-cover rounded-full border-4 border-[#b6c5cd] bg-blue-50"
        src={`../../../mediaProfile/profilePhoto/${publication.login}.png`}
      ></img>
      <div className="w-full ml-2">
        <div className="flex flex-row ml-2 h-max items-center">
          <p className="text-2xl"> {publication.name}</p>
          <p className="ml-2 text-1xl"> @{publication.login}</p>
          <time className="ml-2">{date}</time>
        </div>
        <p className="m-2">{publication.text}</p>
        <div
          className="flex flex-row p-1 m-2"
          id={`mediaPost${publication.id_post}`}
        >
          {media}
        </div>
        <div className="flex m-2">
          <button
            onClick={like}
            className="max-w-max h-10 object-cover rounded-full mr-8 pl-1 bg-blue-200 text-center leading-10 text-gray-950  border  border-gray-950  hover:bg-gray-400 hover:text-white flex justify-center"
          >
            {likes}&#10084;
          </button>
          <button className="w-10 h-10 p-0 object-cover rounded-full mr-8 bg-blue-200 text-center leading-10 text-gray-950  border  border-gray-950  hover:bg-gray-400 hover:text-white flex justify-center">
            &#9993;
          </button>
          {location.pathname === "/mypage" && (
            <button
              onClick={deletePublication}
              className="w-10 h-10 p-0 object-cover rounded-full mr-8 bg-blue-200 text-center leading-10 text-gray-950 border  border-gray-950  hover:bg-gray-400 hover:text-white flex justify-center"
            >
              &#10006;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPublication;
