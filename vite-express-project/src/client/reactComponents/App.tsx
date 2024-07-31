import React, { useState, useEffect, createContext } from "react";
import LogAndReg from "./LogAndReg";
import { getHome } from "../functions/api";
import { UserData } from "../functions/interfaces";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Search from "./Search";
import MyPage from "./MyPage";
import EditMyPage from "./EditMyPage";
import User from "./User";

export const MyContext = createContext<UserData[]>([]);

function App() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const navigator = useNavigate();
  const location = useLocation();
  const user = new URLSearchParams(location.search).get("user")!;

  useEffect(() => {
    async function fetchData() {
      const res = await getHome();
      if (res) {
        setUserData(res);
        navigator("/mypage");
      } else {
        navigator("/logandreg");
      }
    }
    fetchData();
  }, []);

  return (
    <MyContext.Provider value={userData}>
      <Routes>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/searching" element={<Search />}></Route>
        <Route path="/logandreg" element={<LogAndReg />}></Route>
        <Route path="/mypage/edit" element={<EditMyPage />}></Route>
        <Route path="/searching/user" element={<User login={user} />}></Route>
      </Routes>
    </MyContext.Provider>
  );
}

export default App;
