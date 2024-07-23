import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "./Search";
import MyPage from "./MyPage";
interface UserData {
  name: string;
  login: string;
  bio: string;
  photoProfile: string;
  wallpaper: string;
}
function App({ userData }: { userData: UserData }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  function toggleSidebar() {
    const sidebar = document.querySelector<HTMLDivElement>("#sidebar")!;
    setIsSidebarVisible(!isSidebarVisible);
    if (!isSidebarVisible) {
      sidebar.style.display = "block";
    } else {
      sidebar.style.display = "none";
    }
  }

  function logout() {
    fetch("/logout").then((res) => {
      if (res.status === 200) {
        window.location.reload();
      } else alert("Ошибка при выходе!");
    });
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
        <button onClick={logout}>Выйти</button>
        <nav id="sidebar">
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
        <Route path="/" element={<MyPage userData={userData} />} />
      </Routes>
    </>
  );
}

export default App;
