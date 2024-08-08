import React, { useEffect, useState } from "react";
import LogAndReg from "./LogAndReg/LogAndReg";
import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Search from "./Search/Search";
import MyPage from "./MyPage/MyPage";
import EditMyPage from "./EditMyPage/EditMyPage";
import User from "./User/User";
import Subscriptions from "./Subscriptions/Subscriptions";
import Subscribers from "./Subscribers/Subscribers";
import Feed from "./Feed/Feed";
import Like from "./Likes/Like";
import Comments from "./Discussion/Discussion";
import { getLogout, getHome } from "../shared/api/api";

function App() {
  const navigator = useNavigate();
  const location = useLocation();
  const user = new URLSearchParams(location.search).get("user")!;
  const post = parseInt(new URLSearchParams(location.search).get("post")!);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  function toggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }

  async function logout() {
    const res = await getLogout();
    if (res.status === 200) {
      localStorage.removeItem("login");
      navigator("/logandreg");
    }
  }
  useEffect(() => {
    async function fetchData() {
      const res = await getHome();
      if (res.status === 200) {
        navigator("/mypage");
      } else {
        navigator("/logandreg");
      }
    }
    fetchData();
  }, []);

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
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/searching" element={<Search />}></Route>
        <Route path="/logandreg" element={<LogAndReg />}></Route>
        <Route path="/mypage/edit" element={<EditMyPage />}></Route>
        <Route path="/user" element={<User login={user} />}></Route>
        <Route path="/subscriptions" element={<Subscriptions />}></Route>
        <Route path="/subscribers" element={<Subscribers />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/likes" element={<Like post={post} />}></Route>
        <Route path="/comments" element={<Comments post={post} />}></Route>
      </Routes>
    </>
  );
}

export default App;
