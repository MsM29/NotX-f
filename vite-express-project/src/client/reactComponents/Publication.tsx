import React, { useState, useRef } from "react";
import { deleteP, sendLike } from "../functions/api";
import { FeedData } from "../functions/interfaces";
import { useLocation, Link } from "react-router-dom";

function Publication({
  publication,
  updatePage,
}: {
  publication: FeedData;
  updatePage: () => void;
}) {
  const [likes, setLikes] = useState(publication.likes_count);
  const date = new Date(publication.date).toLocaleString("ru");
  const location = useLocation();
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setTooltipVisible(true);
      setTooltipPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
  };

  const handleMouseLeave = () => setTooltipVisible(false);

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
          {publication.mediaType === "image" && (
            <img
              className="w-full object-cover rounded-xl"
              src={`../../../mediaPublication/${publication.media}`}
            ></img>
          )}
          {publication.mediaType === "video" && (
            <video
              className="w-full object-cover rounded-xl"
              src={`../../../mediaPublication/${publication.media}`}
              controls
              autoPlay
              muted
            ></video>
          )}
        </div>
        <div className="flex m-2">
          <button
            ref={buttonRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={like}
            className="max-w-max h-10 object-cover rounded-full mr-8 pl-1 bg-blue-200 text-center leading-10 text-gray-950  border  border-gray-950  hover:bg-gray-400 hover:text-white flex justify-center"
          >
            {likes}&#10084;
          </button>
          <button className="w-10 h-10 p-0 object-cover rounded-full mr-8 bg-blue-200 text-center leading-10 text-gray-950  border  border-gray-950  hover:bg-gray-400 hover:text-white flex justify-center">
            <Link to={`/comments?post=${publication.id_post}`}>&#9993;</Link>
          </button>
          {location.pathname === "/mypage" && (
            <button
              onClick={deletePublication}
              className="w-10 h-10 p-0 object-cover rounded-full mr-8 bg-blue-200 text-center leading-10 text-gray-950 border  border-gray-950  hover:bg-gray-400 hover:text-white flex justify-center"
            >
              &#10006;
            </button>
          )}

          {isTooltipVisible && (
            <div
              style={{
                position: "absolute",
                top: tooltipPosition.top,
                left: tooltipPosition.left,
                transform: "translate(-50%, -100%)",
              }}
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={handleMouseLeave}
              className="bg-gray-800 text-white text-sm rounded shadow-lg p-2"
            >
              <Link
                to={`/likes?post=${publication.id_post}`}
                className="text-blue-400 underline"
              >
                Список
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Publication;
