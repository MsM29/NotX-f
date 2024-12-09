import React, { useState } from "react";
import { postRegistration } from "../../shared/api/api";
import ErrorAlert from "../../shared/components/ErrorAlert";
import SuccessAlert from "../../shared/components/SuccessAlert";
import { showPassword, hidePassword } from "../../shared/utils/show-hide-password";

function Registration() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    repassword: "",
  });
  const [dialogErrorText, setDialogErrorText] = useState("");
  const [dialogSuccessText, setDialogSuccessText] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password === formData.repassword) {
      const data = JSON.stringify(formData);
      const res = await postRegistration(data);
      if (res.status !== 200) {
        const commits = await res.json();
        setDialogErrorText(commits.message);
        setTimeout(() => {
          setDialogErrorText("");
        }, 0);
      } else setDialogSuccessText("registrationAccess");
    } else {
      setDialogErrorText("differentPassword");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <ErrorAlert dialogText={dialogErrorText} />
      <SuccessAlert dialogText={dialogSuccessText} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-around h-full w-full items-center gap-2"
      >
        <input
          type="text"
          placeholder="Имя пользователя"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 box-border border border-gray-5e px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="E-MAIL"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 box-border border border-gray-5e px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="w-full relative">
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            pattern="^[a-zA-Z0-9]+$"
            title="Пароль должен состоять из латинских символов и чисел"
            autoComplete="on"
            required
            className="w-full p-2 box-border border border-gray-5e px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute right-3 top-[20%] w-7 h-7 bg-cover bg-no-repeat bg-[url('../images/open-eye.png')]"
            onMouseOver={showPassword}
            onMouseOut={hidePassword}
          ></div>
        </div>
        <div className="w-full relative">
          <input
            type="password"
            placeholder="Повторите пароль"
            name="repassword"
            value={formData.repassword}
            onChange={handleChange}
            minLength={8}
            pattern="^[a-zA-Z0-9]+$"
            title="Пароль должен состоять из латинских символов и чисел"
            autoComplete="on"
            required
            className="w-full p-2 box-border border border-gray-5e px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute right-3 top-[20%] w-7 h-7 bg-cover bg-no-repeat bg-[url('../images/open-eye.png')]"
            onMouseOver={showPassword}
            onMouseOut={hidePassword}
          ></div>
        </div>
        <button
          type="submit"
          className="w-max bg-blue-200 h-1/4 text-center  text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white flex justify-center items-center"
        >
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>
      </form>
    </>
  );
}

export default Registration;
