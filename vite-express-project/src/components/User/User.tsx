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
import ErrorAlert from "../../shared/components/ErrorAlert";

function User({ login }: { login: string }) {
  const [userData, setUserData] = useState({ name: "", login: "", bio: "" });
  const [publication, setPublication] = useState<PubData[]>([]);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [application, setApplication] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [privateStatus, setPrivateStatus] = useState<boolean>(true);
  const [dialogErrorText, setDialogErrorText] = useState("");

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
    if (res.status === 200) {
      const resServer = await res.json();
      setUserData(resServer[0]);
      setPrivateStatus(resServer[0].private);
    } else setDialogErrorText("unknown");
  }

  async function fetchPublication() {
    const res = await getUserPublication(login, 0);
    if (res.status === 200) {
      const resServer = await res.json();
      setPublication(resServer);
      if (resServer.length !== 0) {
        setMaxPage(Math.ceil(resServer[0].total_count / 10));
      }
    } else setDialogErrorText("unknown");
  }

  useEffect(() => {
    Promise.all([fetchSubscriptions(), fetchUser(), fetchPublication()]);
  }, [login]);

  async function editPage(value: number) {
    const page = value - 1;
    setPage(value);
    const res = await getUserPublication(login, page);
    if (res.status === 200) {
      const resServer = await res.json();
      setPublication(resServer);
      if (resServer.length !== 0) {
        setMaxPage(Math.ceil(resServer[0].total_count / 10));
      }
    } else setDialogErrorText("unknown");
  }

  function dataCollection(element: PubData) {
    return Object.assign({}, userData, element);
  }

  return (
    <>
      <ErrorAlert dialogText={dialogErrorText} />
      <div className="flex mt-[61px] flex-col justify-center border-x-4 border-[#b6c5cd] max-w-[900px] w-screen">
        <div
          id="profileInfo"
          className="flex flex-col justify-between h-max w-full border-y-4 border-[#b6c5cd]"
        >
          <div
            id="wallpaperProfile"
            className={`w-full relative object-cover h-80 flex flex-row bg-cover bg-no-repeat bg-center`}
            style={{
              backgroundImage: `url("../../../mediaProfile/wallpaper/${userData.login}.png")`,
            }}
          >
            <img
              id="photoProfile"
              className="absolute w-64 h-auto aspect-square left-8 object-cover top-32 border-4 border-[#b6c5cd] rounded-full bg-blue-50"
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
          <div className="h-max w-3/4 mt-16">
            <h1
              id="nameProfile"
              className="text-3xl pl-5 pr-5 mb-2 max-w-6xl break-words"
            >
              {userData.name}
            </h1>
            <h2
              id="loginProfile"
              className="text-2xl pl-5 pr-5 mb-2 max-w-6xl break-words"
            >
              @{userData.login}
            </h2>
            <p
              id="bioProfile"
              className="text-1xl pl-5 pr-5 mb-2 break-words max-w-6xl"
            >
              {userData.bio}
            </p>
          </div>
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
          <div className="w-full max-w-[900px] h-max object-cover  bg-no-repeat bg-center">
            <img
              src="../../../../images/privateProfile.png"
              alt="Закрытый профиль"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default User;
