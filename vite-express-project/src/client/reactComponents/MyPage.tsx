import React, { useState, useEffect, useContext } from "react";
import "../styles/myPage.css";
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
    getPublication(setPublication);
  }, []);

  function makePublication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = JSON.stringify({ text });
    postPublication(data, file, context);
  }

  return (
    <div>
      <div className="container">
        <div id="profileInfo">
          <div
            id="wallpaperProfile"
            style={{
              backgroundImage: `url("../../../images/${context[0].photoProfile}")`,
            }}
          >
            <img
              id="photoProfile"
              src={`../../../images/${context[0].photoProfile}`}
            ></img>
            <button id="editProfile">Редактировать</button>
          </div>
          <h1 id="nameProfile" className="profileText">
            {context[0].name}
          </h1>
          <h2 id="loginProfile" className="profileText">
            @{context[0].login}
          </h2>
          <p id="bioProfile" className="profileText">
            {context[0].bio}
          </p>
        </div>
        <form id="creatingPost" onSubmit={makePublication}>
          <textarea
            id="inputPost"
            placeholder="Что нового?"
            onChange={(event) => setText(event.target.value)}
          />
          <div id="listPostButtons">
            <input
              type="file"
              className="postButtons"
              accept="video/*, image/*"
              onChange={(event) =>
                setFile(Array.from(event.target.files || []))
              }
            />
            <button className="postButtons" type="submit">
              Опубликовать
            </button>
          </div>
        </form>
        <div id="myPageFeed">
          {publication.map((element: PubData) => (
            <Publication
              key={element.id_post}
              userData={context[0]}
              publication={element}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
