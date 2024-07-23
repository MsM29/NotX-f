import React, { useState } from "react";
import {postRegistration}from"../functions/api"

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
      postRegistration(data)
    } else {
      alert("Введенные пароли отличаются");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="formLogAndReg">
      <input
        type="text"
        placeholder="Имя пользователя"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        placeholder="E-MAIL"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        name="password"
        value={formData.password}
        onChange={handleChange}
        autoComplete="on"
        required
      />
      <input
        type="password"
        placeholder="Повторите пароль"
        name="repassword"
        value={formData.repassword}
        onChange={handleChange}
        autoComplete="on"
        required
      />
      <button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</button>
    </form>
  );
}

export default Registration;
