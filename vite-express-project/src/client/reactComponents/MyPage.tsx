import React, { useState, useEffect } from "react";
import "../styles/myPage.css";
import Publication from "./Publication";

interface PubData {
  date: string;
  text: string;
}

interface UserData {
  name: string;
  login: string;
  bio: string;
  photoProfile: string;
  wallpaper: string;
}

function MyPage({ userData }: { userData: UserData }) {
  const [text, setText] = useState("");
  const [publication, setPublication] = useState<PubData[]>([]);

  useEffect(() => {
    fetch("/getPublication")
      .then(async (res) => {
        const pubData = await res.json();
        setPublication(pubData);
      })
      .then(() => console.log(publication));
  }, []);

  function makePublication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = JSON.stringify({ text });
    console.log(data);
    fetch("/makePublication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((res) => {
        if (res.status === 200) alert("Опубликовано!");
        else alert("Ошибка публикации");
      })
      .catch((error) => {
        console.error("Ошибка при отправке публикации:", error);
        alert("Ошибка публикации");
      });
  }

  return (
    <>
      <nav id="sidebar">
        <ul>
          <li>
            <a href="">Мой профиль</a>
          </li>
          <li>
            <a href="">Подписки</a>
          </li>
          <li>
            <a href="">Подписчики</a>
          </li>
          <li>
            <a href="">Поиск</a>
          </li>
          <li>
            <a href="">Лента</a>
          </li>
          <li>
            <a href="">Понравилось</a>
          </li>
          <li>
            <a href="">Комментарии</a>
          </li>
        </ul>
      </nav>
      <div id="profile">
        <div id="profileInfo">
          <div
            id="wallpaperProfile"
            style={{
              backgroundImage: `url("../../../images/${userData.photoProfile}")`,
            }}
          >
            <img
              id="photoProfile"
              src={`../../../images/${userData.photoProfile}`}
            ></img>
            <button id="editProfile">Редактировать</button>
          </div>
          <h1 id="nameProfile" className="profileText">
            {userData.name}
          </h1>
          <h2 id="loginProfile" className="profileText">
            @{userData.login}
          </h2>
          <p id="bioProfile" className="profileText">
            {userData.bio}
          </p>
        </div>
        <form id="creatingPost" onSubmit={makePublication}>
          <textarea
            id="inputPost"
            placeholder="Что нового?"
            onChange={(event) => setText(event.target.value)}
          />
          <div id="listPostButtons">
            <button className="postButtons">Прикрепить</button>
            <button className="postButtons" type="submit">
              Опубликовать
            </button>
          </div>
        </form>
        <div id="myPageFeed">
          {publication.map((element: PubData, index) => (
            <Publication
              key={index}
              userData={userData}
              publication={element}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyPage;
