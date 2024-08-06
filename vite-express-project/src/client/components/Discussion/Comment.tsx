import React from "react";
import { FeedData } from "../../shared/interface/interfaces";

function Comments({ publication }: { publication: FeedData }) {
  const date = new Date(publication.date).toLocaleString("ru");

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
        <div className="flex flex-row p-1 m-2">
          {publication.mediaType === "image" && (
            <img
              className="w-full object-cover rounded-xl"
              src={`../../../mediaComment/${publication.media}`}
            ></img>
          )}
          {publication.mediaType === "video" && (
            <video
              className="w-full object-cover rounded-xl"
              src={`../../../mediaComment/${publication.media}`}
              controls
              autoPlay
              muted
            ></video>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comments;
