import React, { useState } from "react";
import Registration from "./Registration";
import Login from "./Login";

function LogAndReg() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="mt-14 w-screen h-full grid place-items-center">
      <header className="w-screen flex fixed top-0 left-0 bg-[#b6c5cd] opacity-100 items-center justify-center">
        <img
          id="logo"
          src="/images/NotX_logo.png"
          alt="Logo"
          className="w-24"
        />
      </header>
      <div className="grid grid-cols-1 w-1/4 h-1/3 place-items-center min-w-80 max-h-80 self">
        <div className="mb-2 flex justify-between w-full gap-4">
          <h3
            id="log"
            className={
              isLogin
                ? "text-center leading-10 rounded-md w-1/2 border border-gray-950 px-4 py-2 bg-[#b6c5cd] text-white"
                : "bg-blue-200 text-center leading-10 text-gray-950 rounded-md w-1/2 border border-gray-950 px-4 py-2 hover:bg-blue-100"
            }
            onClick={() => setIsLogin(true)}
          >
            ВХОД
          </h3>
          <h3
            id="reg"
            className={
              isLogin
                ? "bg-blue-200 text-center leading-10 text-gray-950 rounded-md w-1/2 border border-gray-950 px-4 py-2 hover:bg-blue-100"
                : "text-center leading-10 rounded-md w-1/2 border border-gray-950 px-4 py-2 bg-[#b6c5cd] text-white"
            }
            onClick={() => setIsLogin(false)}
          >
            РЕГИСТРАЦИЯ
          </h3>
        </div>
        <div
          id="forForm"
          className="flex flex-col justify-around h-full w-full items-center"
        >
          {isLogin ? <Login /> : <Registration />}
        </div>
      </div>
    </div>
  );
}

export default LogAndReg;
