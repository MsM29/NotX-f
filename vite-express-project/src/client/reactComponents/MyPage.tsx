import React, { useState, useEffect } from "react";
import "../styles/myPage.css";
import Publication from "./Publication";

interface PubData {
  id_post: number;
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
  const [file, setFile] = useState<File[]>([]);

  useEffect(() => {
    fetch("/getPublication").then(async (res) => {
      const pubData = await res.json();
      setPublication(pubData);
    });
  }, []);

  function makePublication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(file);
    const data = JSON.stringify({ text });
    fetch("/makePublication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then(async (res) => {
        if (res.status === 200) {
          const pubInsert = await res.json();
          console.log(file);
          let type;
          if (file[0].type.split("/")[0] === "image") type = ".png";
          else type = ".mp4";
          if (file) {
            const filename =
              file[0].type.split("/")[0] +
              "_" +
              userData.name +
              "_" +
              pubInsert.insertId +
              "_" +
              Date.now() +
              type;
            let filedata = new FormData();
            filedata.append("filedata", new Blob(file), filename);
            console.log(filedata);
            fetch("/addMedia", {
              method: "POST",
              headers: {
                name: filename,
                pub_id: pubInsert.insertId,
              },
              body: filedata,
            }).then((res) => {
              if (res.status === 200) alert("Опубликовано!");
              else alert("Ошибка публикации");
            });
          } else alert("Опубликовано!");
        } else alert("Ошибка публикации");
      })
      .catch((error) => {
        console.error("Ошибка при отправке публикации:", error);
        alert("Ошибка публикации");
      });
  }

  return (
    <div>
      <div className="container">
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
              userData={userData}
              publication={element}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
