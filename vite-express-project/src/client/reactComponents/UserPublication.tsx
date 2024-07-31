import React, { useEffect, useState } from "react";
import { getMedia } from "../functions/api";
import { PubData, UserData } from "../functions/interfaces";

function UserPublication({
  userData,
  publication,
}: {
  userData: UserData;
  publication: PubData;
}) {
  const [media, setMedia] = useState(<></>);
  const date = new Date(publication.date).toLocaleString("ru");

  useEffect(() => {
    async function mediaFunc() {
      const data = JSON.stringify({ id_post: publication.id_post });
      const res = await getMedia(data);
      setMedia(res);
    }
    mediaFunc();
  }, []);

  return (
    <div className="flex flex-row p-2">
      <img
        className="w-24 h-24 object-cover rounded-full border-4 border-[#b6c5cd]"
        src={`../../../mediaProfile/profilePhoto/${userData.login}.png`}
      ></img>
      <div className="w-full ml-2">
        <div className="flex flex-row ml-2 h-max items-center">
          <p className="text-2xl"> {userData.name}</p>
          <p className="ml-2 text-1xl"> @{userData.login}</p>
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
          <button className="w-10 h-10 p-0 object-cover rounded-full mr-8  bg-blue-200 text-center leading-10 text-gray-950  border  border-gray-950  hover:bg-gray-400 hover:text-white flex justify-center">
            &#10084;
          </button>
          <button className="w-10 h-10 p-0 object-cover rounded-full mr-8 bg-blue-200 text-center leading-10 text-gray-950  border  border-gray-950  hover:bg-gray-400 hover:text-white flex justify-center">
            &#9993;
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPublication;
