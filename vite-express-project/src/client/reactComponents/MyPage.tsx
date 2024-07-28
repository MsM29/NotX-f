import React, { useState, useEffect, useContext } from "react";
import Publication from "./Publication";
import { MyContext } from "./App";
import { getPublication, postPublication } from "../functions/api";
import { PubData } from "../functions/interfaces";

function MyPage() {
  const context = useContext(MyContext);
  const [text, setText] = useState("");
  const [publication, setPublication] = useState<PubData[]>([]);
  const [file, setFile] = useState<File[]>([]);

  useEffect(() => {
    async function pubFunc() {
      const res = await getPublication();
      setPublication(res);
    }
    pubFunc();
  }, [text]);

  function makePublication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = JSON.stringify({ text });
    postPublication(data, file, context);
    setText("");
  }

  return (
    <div className="flex flex-col justify-center items-center border-x-4 border-[#b6c5cd]">
      <div
        id="profileInfo"
        className="flex flex-col w-full border-y-4 border-[#b6c5cd]"
      >
        <div
          id="wallpaperProfile"
          className="w-full object-cover mb-28 h-80 flex flex-row"
          style={{
            backgroundImage: `url("../../../images/${context[0].wallpaper}")`,
          }}
        >
          <img
            id="photoProfile"
            className="w-64 h-64 object-cover mt-44 ml-24 border-4 border-[#b6c5cd] rounded-full"
            src={`../../../images/${context[0].photoProfile}`}
          ></img>
          <button
            id="editProfile"
            className="w-40 p-0 h-min ml-[500px] mt-[390px] bg-blue-200 leading-10 text-gray-950 rounded-md border text-center border-gray-950  hover:bg-gray-400 hover:text-white flex justify-center"
          >
            Редактировать
          </button>
        </div>
        <h1 id="nameProfile" className="text-3xl pl-5 pr-5 mb-2">
          {context[0].name}
        </h1>
        <h2 id="loginProfile" className="text-2xl pl-5 pr-5 mb-2">
          @{context[0].login}
        </h2>
        <p
          id="bioProfile"
          className="text-1xl pl-5 pr-5 mb-2 break-words max-w-6xl"
        >
          {context[0].bio}
        </p>
      </div>
      <form
        id="creatingPost"
        className="flex justify-center mt-3 items-center flex-col w-full pb-2 "
        onSubmit={makePublication}
      >
        <textarea
          id="inputPost"
          className="mt-2 h-24 w-11/12 p-1 mb-2 resize-none rounded-xl"
          placeholder="Что нового?"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div
          id="listPostButtons"
          className="flex items-center justify-evenly w-11/12 gap-1"
        >
          <input
            type="file"
            className=" w-6/12 bg-blue-200 text-center leading-10 text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white"
            accept="video/*, image/*"
            onChange={(event) => setFile(Array.from(event.target.files || []))}
          />
          <button
            className="w-6/12 h-[62.5px] bg-blue-200 text-center leading-10 text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white"
            type="submit"
          >
            Опубликовать
          </button>
        </div>
      </form>
      <div id="myPageFeed" className="max-w-7xl">
        {publication.map((element: PubData) => (
          <Publication
            key={element.id_post}
            userData={context[0]}
            publication={element}
          />
        ))}
      </div>
    </div>
  );
}

export default MyPage;
