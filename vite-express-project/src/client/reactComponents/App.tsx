import React, { useEffect, createContext } from "react";
import LogAndReg from "./LogAndReg";
import { UserData } from "../functions/interfaces";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Search from "./Search";
import MyPage from "./MyPage";
import EditMyPage from "./EditMyPage";
import User from "./User";
import Subscriptions from "./Subscriptions";
import Subscribers from "./Subscribers";
import Feed from "./Feed";
import Like from "./Like";

export const MyContext = createContext<UserData[]>([]);

function App() {
  const navigator = useNavigate();
  const location = useLocation();
  const user = new URLSearchParams(location.search).get("user")!;
  const post = parseInt(new URLSearchParams(location.search).get("post")!);

  useEffect(() => {
    async function fetchData() {
      navigator("/mypage");
    }
    fetchData();
  }, []);

  return (
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
    </Routes>
  );
}

export default App;
