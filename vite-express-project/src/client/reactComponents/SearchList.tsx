import { UserData } from "../functions/interfaces";
import { Link } from "react-router-dom";
import {
  postSubscribe,
  postUnsubscribe,
  checkSubscription,
} from "../functions/api";
import React, { useEffect, useState } from "react";

function SearchList({ searchData }: { searchData: UserData[] }) {
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  console.log(searchData)
  useEffect(() => {
    async function fetchSubscriptions() {
      const subscribedLogins = await Promise.all(
        searchData.map(async (element) => {
          const res = await checkSubscription(element.login);
          return res.status === 200 ? element.login : null;
        }),
      ).then((results) => results.filter((login) => login !== null));
      setSubscriptions(subscribedLogins);
    }
    fetchSubscriptions();
  }, [searchData]);

  async function subscribe(login: string) {
    const res = await postSubscribe(login);
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

  return searchData.map((element, index) => {
    console.log(element)
    const isSubscribed = subscriptions.includes(element.login);

    return (
      <div
        key={index}
        className="flex flex-row mb-2 p-3 justify-around items-center w-full"
      >
        <img
          id="photoProfile"
          className="w-64 h-64 object-cover border-4 border-[#b6c5cd] rounded-full"
          src={`../../../mediaProfile/profilePhoto/${element.login}.png`}
        ></img>
        <div className="w-4/12 p-3">
          <Link to={`/user?user=${element.login}`}>
            <h1 id="nameProfile" className="text-3xl">
              {element.name}
            </h1>
          </Link>
          <h2 id="loginProfile" className="text-2xl">
            @{element.login}
          </h2>
          <p id="bioProfile" className="profileText">
            {element.bio}
          </p>
        </div>
        {isSubscribed ? (
          <button
            onClick={() => unsubscribe(element.login)}
            className="h-min w-4/12  leading-10 bg-gray-400 text-white  rounded-md border text-center border-gray-950 px-4 py-2 hover:bg-blue-200 hover:text-gray-950 "
          >
            Отписаться
          </button>
        ) : (
          <button
            onClick={() => subscribe(element.login)}
            className="h-min w-4/12 bg-blue-200 leading-10 text-gray-950 rounded-md border text-center border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white "
          >
            Подписаться
          </button>
        )}
      </div>
    );
  });
}

export default SearchList;
