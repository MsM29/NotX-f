import React, { useState } from "react";
import { postLogin } from "../../shared/api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = JSON.stringify(formData);
    const res = await postLogin(data);
    if (res.status === 200) {
      navigate("/mypage");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-around h-full w-full items-center"
    >
      <input
        type="email"
        placeholder="E-MAIL"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="mb-2 w-full p-2 box-border border border-gray-5e px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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
        type="submit"
        className="w-6/12 bg-blue-200 text-center leading-10 text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white flex justify-center"
      >
        ВОЙТИ
      </button>
    </form>
  );
}

export default Login;
