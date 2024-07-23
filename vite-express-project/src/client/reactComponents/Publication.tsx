import React, { useEffect } from "react";
import ReactDOMClient from "react-dom/client";

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

function Publication({
  userData,
  publication,
}: {
  userData: UserData;
  publication: PubData;
}) {
  useEffect(() => {
    const data = JSON.stringify({ id_post: publication.id_post });
    fetch("/getMedia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }).then(async (res) => {
      const pubData = await res.json();
      if (pubData.length !== 0) {
        const divMedia = ReactDOMClient.createRoot(
          document.querySelector(`#mediaPost${publication.id_post}`)!
        );
        if (pubData[0].format === "image") {
          divMedia.render(
            <img
              src={`../../../mediaPublication/${pubData[0].media_name}`}
            ></img>
          );
        } else if (pubData[0].format === "video") {
          divMedia.render(
            <video
              src={`../../../mediaPublication/${pubData[0].media_name}`}
              controls
              autoPlay
              muted
            ></video>
          );
        }
      }
    });
  }, []);

  return (
    <div className="post">
      <img
        className="postProfile"
        src={`../../../images/${userData.photoProfile}`}
      ></img>
      <div>
        <div>
          <p className="postProfile"> {userData.name}</p>
          <p className="postProfile"> @{userData.login}</p>
          <time className="postProfile" dateTime="">
            {publication.date}
          </time>
        </div>
        <p>{publication.text}</p>
        <div className="media" id={`mediaPost${publication.id_post}`}></div>
        <div className="postButtons">
          <button className="like">&#10084;</button>
          <button className="comment">&#9993;</button>
          <button className="delete">&#10006;</button>
        </div>
      </div>
    </div>
  );
}

export default Publication;
