import React, { useEffect } from "react";
import {getMedia}from "../functions/api"
import {PubData, UserData }from "../functions/interfaces"

function Publication({
  userData,
  publication,
}: {
  userData: UserData;
  publication: PubData;
}) {
  useEffect(() => {
    const data = JSON.stringify({ id_post: publication.id_post });
    getMedia(data,publication)
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
