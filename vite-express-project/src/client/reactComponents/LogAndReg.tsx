import React, { useState } from "react";
import Registration from "./Registration";
import Login from "./Login";

function LogAndReg() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div id="container">
      <div>
        <h3
          id="log"
          className={isLogin ? "dark" : "light"}
          onClick={() => setIsLogin(true)}
        >
          ВХОД
        </h3>
        <h3
          id="reg"
          className={isLogin ? "light" : "dark"}
          onClick={() => setIsLogin(false)}
        >
          РЕГИСТРАЦИЯ
        </h3>
      </div>
      <div id="forForm">{isLogin ? <Login /> : <Registration />}</div>
    </div>
  );
}

export default LogAndReg;
