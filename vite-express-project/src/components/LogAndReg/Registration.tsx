import React, { useState } from "react";
import { postRegistration } from "../../shared/api/api";

function Registration() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    repassword: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password === formData.repassword) {
      const data = JSON.stringify(formData);
      postRegistration(data);
    } else {
      alert("Введенные пароли отличаются");
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
        type="text"
        placeholder="Имя пользователя"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="mb-2 w-full p-2 box-border border border-gray-5e px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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
      <input
        type="password"
        placeholder="Повторите пароль"
        name="repassword"
        value={formData.repassword}
        onChange={handleChange}
        autoComplete="on"
        required
        className="mb-2 w-full p-2 box-border border border-gray-5e px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-6/12 bg-blue-200 text-center leading-10 text-gray-950 rounded-md border  border-gray-950 px-4 py-2 hover:bg-gray-400 hover:text-white flex justify-center"
      >
        ЗАРЕГИСТРИРОВАТЬСЯ
      </button>
    </form>
  );
}

export default Registration;
