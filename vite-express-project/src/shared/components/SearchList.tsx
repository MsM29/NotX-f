import { UserData } from "../interface/interfaces";
import { Link } from "react-router-dom";
import {
  postSubscribe,
  postUnsubscribe,
  checkSubscription,
  acceptApplication,
  rejectApplication,
} from "../api/api";
import React, { useEffect, useState } from "react";

function SearchList({ searchData }: { searchData: UserData[] }) {
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [applications, setApplications] = useState<{
    [login: string]: boolean;
  }>({});

  useEffect(() => {
    Promise.all([fetchSubscriptions(), fetchApplications()]);
  }, [searchData]);

  async function fetchSubscriptions() {
    const subscribedLogins = await Promise.all(
      searchData.map(async (element) => {
        const res = await checkSubscription(element.login);
        return res.status === 200 ? element.login : null;
      })
    ).then((results) => results.filter((login) => login !== null));
    setSubscriptions(subscribedLogins);
  }

  async function fetchApplications() {
    const appData: { [login: string]: boolean } = {};
    for (const element of searchData) {
      appData[element.login] = element.application;
    }
    setApplications(appData);
  }

  async function subscribe(login: string, privateStatus: boolean) {
    const res = await postSubscribe(login, privateStatus);
    if (res.status === 200) {
      setSubscriptions([...subscriptions, login]);
    }
  }

  async function unsubscribe(login: string) {
    const res = await postUnsubscribe(login);
    if (res.status === 200) {
      setSubscriptions(subscriptions.filter((l) => l !== login));
    }
  }

  async function accept(login: string) {
    const res = await acceptApplication(login);
    if (res.status === 200) {
      setApplications({ ...applications, [login]: true });
    }
  }

  async function reject(login: string) {
    const res = await rejectApplication(login);
    if (res.status === 200) {
      setApplications({ ...applications, [login]: true });
    }
  }

  return searchData.map((element, index) => {
    const isSubscribed = subscriptions.includes(element.login);
    const application = applications[element.login] || false;

    function acceptSub() {
      accept(element.login);
    }

    function rejectSub() {
      reject(element.login);
    }

    function unsub() {
      unsubscribe(element.login);
    }

    function sub() {
      subscribe(element.login, element.private);
    }

    return (
      <div
        key={index}
        className="justify-around items-center max-w-[900px] w-screen flex flex-row flex-wrap gap-3 border-dashed border-b-2 border-[#b6c5cd] pb-2 pt-2"
      >
        <img
          id="photoProfile"
          className="w-64 aspect-square object-cover border-4 border-[#b6c5cd] rounded-full bg-blue-50"
          src={`../../../mediaProfile/profilePhoto/${element.login}.png`}
          alt="Фото профиля"
        ></img>
        <div className="w-72 items-center flex flex-col">
          <Link to={`/user?user=${element.login}`}>
            <h1 id="nameProfile" className="text-3xl max-w-full break-words">
              {element.name}
            </h1>
          </Link>
          <h2 id="loginProfile" className="text-2xl max-w-full break-words">
            @{element.login}
          </h2>
          <p id="bioProfile" className="max-w-full break-words">
            {element.bio}
          </p>
        </div>
        <div className="w-72 flex flex-row flex-wrap">
          {!application && (
            <>
              <button
                onClick={acceptSub}
                className="w-full h-min bg-blue-200 leading-10 text-gray-950 rounded-md border text-center border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white "
              >
                Принять
              </button>
              <button
                onClick={rejectSub}
                className="w-full  h-min leading-10 bg-red-500 text-white  rounded-md border text-center border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white "
              >
                Отклонить
              </button>
            </>
          )}
          {isSubscribed ? (
            <button
              onClick={unsub}
              className="w-full  h-min leading-10 bg-gray-400 text-white  rounded-md border text-center border-gray-950 px-4 py-2 hover:bg-blue-200 hover:text-gray-950 "
            >
              Отписаться
            </button>
          ) : (
            <button
              onClick={sub}
              className="w-full bg-blue-200 leading-10 text-gray-950 rounded-md border text-center border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white "
            >
              Подписаться
            </button>
          )}
        </div>
      </div>
    );
  });
}

export default SearchList;
