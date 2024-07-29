import React, { useEffect, useState } from "react";
import { userPage } from "../functions/api";
import { getUserPublication } from "../functions/api";
import { PubData } from "../functions/interfaces";
import Publication from "./Publication";

function User({ login }: { login: string | undefined | null }) {
  const [userData, setUserData] = useState({ name: "", login: "", bio: "" });
  const [publication, setPublication] = useState<PubData[]>([]);

  useEffect(() => {
    async function user() {
      const res = await userPage(login);
      setUserData(res[0]);
    }
    async function pubFunc() {
      const res = await getUserPublication(login);
      setPublication(res);
    }
    user();
    pubFunc();
  }, []);

  return (
    <div className="flex flex-col justify-center border-x-4 border-[#b6c5cd] max-w-5xl">
      <div
        id="profileInfo"
        className="flex flex-col w-full border-y-4 border-[#b6c5cd]"
      >
        <div
          id="wallpaperProfile"
          className={`w-full object-cover mb-28 h-80 flex flex-row bg-cover bg-no-repeat bg-center`}
          style={{
            backgroundImage: `url("../../../mediaProfile/wallpaper/${userData.login}.png")`,
          }}
        >
          <img
            id="photoProfile"
            className="w-64 h-64 object-cover mt-44 ml-24 border-4 border-[#b6c5cd] rounded-full"
            src={
              `../../../mediaProfile/profilePhoto/${userData.login}` + ".png"
            }
          ></img>
          <button className="w-40 p-0 h-min ml-[400px] mt-[390px] bg-blue-200 leading-10 text-gray-950 rounded-md border text-center border-gray-950  hover:bg-gray-400 hover:text-white flex justify-center">
            Подписаться
          </button>
        </div>
        <h1 id="nameProfile" className="text-3xl pl-5 pr-5 mb-2">
          {userData.name}
        </h1>
        <h2 id="loginProfile" className="text-2xl pl-5 pr-5 mb-2">
          @{userData.login}
        </h2>
        <p
          id="bioProfile"
          className="text-1xl pl-5 pr-5 mb-2 break-words max-w-6xl"
        >
          {userData.bio}
        </p>
      </div>
      <div id="myPageFeed" className="max-w-7xl">
        {publication.map((element: PubData) => (
          <Publication
            key={element.id_post}
            userData={userData}
            publication={element}
          />
        ))}
      </div>
    </div>
  );
}

export default User;
