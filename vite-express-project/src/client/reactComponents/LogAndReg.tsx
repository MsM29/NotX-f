import React, { useState } from "react";
import Registration from "./Registration";
import Login from "./Login";

function LogAndReg() {
  const [isLogin, setIsLogin] = useState(true);
  const selected =
    "text-center leading-10 text-gray-950 rounded-md w-48 border border-gray-950 px-4 py-2 bg-[#b6c5cd] text-white";
  const notSelected =
    "bg-blue-200 text-center leading-10 text-gray-950 rounded-md w-48 border border-gray-950 px-4 py-2 hover:bg-blue-100";

  return (
    <>
      <header className="w-full flex fixed top-0 left-0 bg-[#b6c5cd] opacity-100 items-center justify-center">
        <img
          id="logo"
          src="/images/NotX_logo.png"
          alt="Logo"
          className="w-24"
        />
      </header>
      <div
        id="container"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
      >
        <div className="mb-2 flex justify-between w-full gap-4">
          <h3
            id="log"
            className={isLogin ? selected : notSelected}
            onClick={() => setIsLogin(true)}
          >
            ВХОД
          </h3>
          <h3
            id="reg"
            className={isLogin ? notSelected : selected}
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
    </>
  );
}

export default LogAndReg;
