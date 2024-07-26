import React, { useState, useEffect, createContext } from "react";
import LogAndReg from "./LogAndReg";
import Main from "./Main";
import { getHome } from "../functions/api";
import { UserData } from "../functions/interfaces";

export const MyContext = createContext<UserData[]>([]);

function App() {
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    getHome(setAuth, setUserData);
  }, []);

  return (
    <MyContext.Provider value={userData}>
      {auth ? <Main /> : <LogAndReg />}
    </MyContext.Provider>
  );
}

export default App;
