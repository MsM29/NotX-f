import React, { useEffect, useState } from "react";
import {
  userPage,
  postSubscribe,
  getUserPublication,
  postUnsubscribe,
  checkSubscription,
} from "../../shared/api/api";
import { PubData } from "../../shared/interface/interfaces";
import Publication from "../../shared/components/Publication";
import Pagination from "../../shared/components/Pagination";

function User({ login }: { login: string }) {
  const [userData, setUserData] = useState({ name: "", login: "", bio: "" });
  const [publication, setPublication] = useState<PubData[]>([]);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [application, setApplication] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [privateStatus, setPrivateStatus] = useState<boolean>(true);

  async function subscribe(login: string) {
    const res = await postSubscribe(login, privateStatus);
    if (res.status === 200) setIsSubscribe(true);
  }

  async function unsubscribe(login: string) {
    const res = await postUnsubscribe(login);
    if (res.status === 200) setIsSubscribe(false);
  }

  async function fetchSubscriptions() {
    const res = await checkSubscription(login);
    if (res.status === 200) {
      const data = await res.json();
      setIsSubscribe(true);
      setApplication(data[0].application);
    }
  }

  async function fetchUser() {
    const res = await userPage(login);
    setUserData(res[0]);
    setPrivateStatus(res[0].private);
  }

  async function fetchPublication() {
    const res = await getUserPublication(login, 0);
    setPublication(res);
    if (res.length !== 0) {
      setMaxPage(Math.ceil(res[0].total_count / 10));
    }
  }

  useEffect(() => {
    Promise.all([fetchSubscriptions(), fetchUser(), fetchPublication()]);
  }, [login]);

  async function editPage(value: number) {
    const page = value - 1;
    const res = await getUserPublication(login, page);
    setPage(value);
    setPublication(res);
    setMaxPage(Math.ceil(res[0].total_count / 10));
  }

  function dataCollection(element: PubData) {
    return Object.assign({}, userData, element);
  }

  return (
    <div className="flex flex-col justify-center border-x-4 border-[#b6c5cd] max-w-5xl w-[900px]">
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
            className="w-64 h-64 object-cover mt-44 ml-24 border-4 border-[#b6c5cd] rounded-full bg-blue-50"
            src={`../../../mediaProfile/profilePhoto/${userData.login}.png`}
            alt="Фото профиля"
          ></img>
          {isSubscribe ? (
            <button
              onClick={() => unsubscribe(login)}
              className="w-40 p-0 h-min ml-[300px] mt-[390px]  leading-10  rounded-md border text-center border-gray-950 bg-gray-400 text-white hover:bg-blue-200 hover:text-gray-950 flex justify-center"
            >
              Отписаться
            </button>
          ) : (
            <button
              onClick={() => subscribe(login)}
              className="w-40 p-0 h-min ml-[300px] mt-[390px] bg-blue-200 leading-10 text-gray-950 rounded-md border text-center border-gray-950  hover:bg-gray-400 hover:text-white flex justify-center"
            >
              Подписаться
            </button>
          )}
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
      {(privateStatus && application) || !privateStatus ? (
        <>
          <div id="myPageFeed" className="max-w-7xl">
            {publication.map((element: PubData) => (
              <Publication
                key={element.id_post}
                publication={dataCollection(element)}
                updatePage={fetchPublication}
              />
            ))}
          </div>
          <Pagination page={page} maxPage={maxPage} editPage={editPage} />
        </>
      ) : (
        <div
          className="h-[500px] w-full object-contain bg-no-repeat bg-center"
          style={{
            backgroundImage: `url("../../../../images/privateProfile.png")`,
          }}
        ></div>
      )}
    </div>
  );
}

export default User;
