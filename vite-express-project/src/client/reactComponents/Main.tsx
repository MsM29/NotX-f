import Search from "./Search";
import MyPage from "./MyPage";
import { Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import { getLogout } from "../functions/api";

function Main() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  function toggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }

  return (
    <>
      <header>
        <img
          id="sidebarButton"
          className={isSidebarVisible ? "rotate" : "notRotate"}
          src="/images/icons8-боковое-меню-48.png"
          onClick={toggleSidebar}
          alt="Toggle Sidebar"
        />
        <img id="logo" src="/images/NotX_logo.png" alt="Logo" />
        <button onClick={getLogout}>Выйти</button>
        <nav
          id="sidebar"
          style={{ display: isSidebarVisible ? "block" : "none" }}
        >
          <ul>
            <li>
              <Link to="/">Мой профиль</Link>
            </li>
            <li>
              <Link to="/subscriptions">Подписки</Link>
            </li>
            <li>
              <Link to="/subscribers">Подписчики</Link>
            </li>
            <li>
              <Link to="/search">Поиск</Link>
            </li>
            <li>
              <Link to="/feed">Лента</Link>
            </li>
            <li>
              <Link to="/likes">Понравилось</Link>
            </li>
            <li>
              <Link to="/comments">Комментарии</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<MyPage />} />
      </Routes>
    </>
  );
}

export default Main;
