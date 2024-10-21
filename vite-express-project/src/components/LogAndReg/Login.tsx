import React, { useState } from "react";
import { postLogin } from "../../shared/api/api";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../shared/components/ErrorAlert";
import {
  showPassword,
  hidePassword,
} from "../../shared/utils/show-hide-password";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [dialogText, setDialogText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = JSON.stringify(formData);
    const res = await postLogin(data);
    if (res.status === 200) {
      navigate("/mypage");
    } else {
      const resData = await res.json();
      setDialogText(resData.message);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <ErrorAlert dialogText={dialogText} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-around h-full w-full items-center"
      >
        <input
          placeholder="Логин или E-MAIL"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mb-2 w-full p-2 box-border border border-gray-5e px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="w-full">
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="on"
            required
            className="mb-2 w-full p-2 box-border border border-gray-5e px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="absolute right-5 mt-[6px] w-7 h-7 bg-cover bg-no-repeat bg-[url('../images/open-eye.png')]"
            onMouseOver={showPassword}
            onMouseOut={hidePassword}
          ></button>
        </div>
        <button
          type="submit"
          className="w-6/12 bg-blue-200 text-center leading-10 text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white flex justify-center"
        >
          ВОЙТИ
        </button>
      </form>
    </>
  );
}

export default Login;
