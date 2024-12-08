import React, { useState, useEffect } from "react";
import Publication from "../../shared/components/Publication";
import { getPublication, postPublication, getHome } from "../../shared/api/api";
import { PubData } from "../../shared/interface/interfaces";
import { Link } from "react-router-dom";
import Pagination from "../../shared/components/Pagination";

function MyPage() {
  const [userData, setUserData] = useState({ name: "", login: "", bio: "" });
  const [text, setText] = useState("");
  const [publication, setPublication] = useState<PubData[]>([]);
  const [file, setFile] = useState<File[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    async function fetchHome() {
      const res = await getHome();
      const data = await res.json();
      setUserData(data[0]);
      localStorage.setItem("login", data[0].login);
    }
    Promise.all([fetchPublications(), fetchHome()]);
  }, []);

  async function fetchPublications() {
    const res = await getPublication(0);
    setPublication(res);
    if (res.length !== 0) {
      setMaxPage(Math.ceil(res[0].total_count / 10));
    }
  }

  async function makePublication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = JSON.stringify({ text });
    await postPublication(data, file);
    await fetchPublications();
    setText("");
  }

  async function editPage(value: number) {
    const page = value - 1;
    const res = await getPublication(page);
    setPage(value);
    setPublication(res);
    setMaxPage(Math.ceil(res[0].total_count / 10));
  }

  return (
    <div className="flex mt-[61px] flex-col justify-center border-x-4 border-[#b6c5cd] max-w-[900px] w-screen">
      <div
        id="profileInfo"
        className="flex flex-col justify-between h-[520px] w-full border-y-4 border-[#b6c5cd]"
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
          <Link to="/mypage/edit" id="editProfile">
            <img
              src="../images/edit_button.png"
              className="w-9 p-0 absolute mt-[420px] right-8 bg-blue-200 rounded-md border text-center border-gray-950  hover:bg-gray-400 "
            ></img>
          </Link>
        </div>
        <div className="h-32">
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
      <form
        id="creatingPost"
        className="flex justify-center mt-3 items-center flex-col w-full pb-2"
        onSubmit={makePublication}
      >
        <textarea
          id="inputPost"
          className="mt-2 h-24 w-11/12 p-1 mb-2 resize-none rounded-xl"
          placeholder="Что нового?"
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={280}
        />
        <div
          id="listPostButtons"
          className="flex items-center justify-evenly w-11/12 gap-1"
        >
          <input
            type="file"
            className=" w-6/12 bg-blue-200 text-center leading-10 text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white"
            accept="video/*, image/*"
            onChange={(event) => setFile(Array.from(event.target.files || []))}
          />
          <button
            className="w-6/12 h-[62.5px] bg-blue-200 text-center leading-10 text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white"
            type="submit"
          >
            Опубликовать
          </button>
        </div>
      </form>
      <div id="myPageFeed" className="max-w-7xl">
        {publication.map((element: PubData) => (
          <Publication
            key={element.id_post}
            publication={Object.assign({}, userData, element)}
            updatePage={fetchPublications}
          />
        ))}
      </div>
      <Pagination page={page} maxPage={maxPage} editPage={editPage} />
    </div>
  );
}

export default MyPage;
