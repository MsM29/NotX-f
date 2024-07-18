import React, { useEffect, useState, useRef } from "react";
import ReactDOMClient from "react-dom/client";
import Registration from "./Registration";
import Login from "./Login";

function LogAndReg() {
  const [isLogin, setIsLogin] = useState(true);
  const rootRef = useRef<ReactDOMClient.Root | null>(null);

  useEffect(() => {
    const container = document.querySelector("#forForm");
    if (container && !rootRef.current) {
      rootRef.current = ReactDOMClient.createRoot(container);
    }
    
    if (rootRef.current) {
      rootRef.current.render(isLogin ? <Login /> : <Registration />);
    }
  }, [isLogin]);

  const handleClick = (isLoginForm: boolean) => {
    setIsLogin(isLoginForm);
  };

  return (
    <div id="container">
      <div>
        <h3
          id="log"
          className={isLogin ? "dark" : "light"}
          onClick={() => handleClick(true)}
        >
          ВХОД
        </h3>
        <h3
          id="reg"
          className={isLogin ? "light" : "dark"}
          onClick={() => handleClick(false)}
        >
          РЕГИСТРАЦИЯ
        </h3>
      </div>
      <div id="forForm"></div>
    </div>
  );
}

export default LogAndReg;