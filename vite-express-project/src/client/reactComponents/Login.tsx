import React, { useState } from "react";
import {postLogin} from "../functions/api"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = JSON.stringify(formData);
    postLogin(data)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="formLogAndReg">
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
      <button type="submit">ВОЙТИ</button>
    </form>
  );
}

export default Login;
