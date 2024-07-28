import React, { useState, useEffect, createContext } from "react";
import LogAndReg from "./LogAndReg";
import { getHome } from "../functions/api";
import { UserData } from "../functions/interfaces";
import { useNavigate, useLocation } from "react-router-dom";
import Search from "./Search";
import MyPage from "./MyPage";

export const MyContext = createContext<UserData[]>([]);

function App() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const navigator = useNavigate();
  const location = useLocation();

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
      {location.pathname === "/mypage" && <MyPage />}
      {location.pathname === "/logandreg" && <LogAndReg />}
      {location.pathname === "/searching" && <Search />}
    </MyContext.Provider>
  );
}

export default App;
