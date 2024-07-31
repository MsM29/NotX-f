import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getLogout } from "../functions/api";

function Main() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  function toggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }
  const navigator = useNavigate();

  async function logout() {
    const res = await getLogout();
    if (res.status === 200) navigator("/logandreg");
  }

  return (
    <>
      <header className="justify-between w-full flex fixed top-0 left-0 bg-[#b6c5cd] opacity-100 items-center">
        <img
          id="sidebarButton"
          className={`w-24 order-1 h-10 object-contain ${isSidebarVisible ? "rotate-90" : ""}`}
          src="/images/icons8-боковое-меню-48.png"
          onClick={toggleSidebar}
          alt="Toggle Sidebar"
        />
        <img
          id="logo"
          className="w-24 order-2"
          src="/images/NotX_logo.png"
          alt="Logo"
        />
        <button
          className="order-3 w-24 mr-2 bg-blue-200 text-center text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white "
          onClick={logout}
        >
          Выйти
        </button>
        <nav
          id="sidebar"
          className=" hidden fixed bg-[#b6c5cd] left-0 w-80 top-14"
          style={{ display: isSidebarVisible ? "block" : "none" }}
        >
          <ul>
            <li className="m-4 list-none">
              <Link to="/mypage">Мой профиль</Link>
            </li>
            <li className="m-4 list-none">
              <Link to="/subscriptions">Подписки</Link>
            </li>
            <li className="m-4 list-none">
              <Link to="/subscribers">Подписчики</Link>
            </li>
            <li className="m-4 list-none">
              <Link to="/searching">Поиск</Link>
            </li>
            <li className="m-4 list-none">
              <Link to="/feed">Лента</Link>
            </li>
            <li className="m-4 list-none">
              <Link to="/likes">Понравилось</Link>
            </li>
            <li className="m-4 list-none">
              <Link to="/comments">Комментарии</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Main;
