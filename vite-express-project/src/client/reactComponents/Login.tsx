import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = JSON.stringify({ email, password });
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      console.log(response.status)
      if (!response.ok) {
        let commits = await response.json();
        throw new Error(commits.message);
      } else window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formLogAndReg">
      <input
        type="email"
        placeholder="E-MAIL"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="on"
        required
      />
      <button type="submit">ВОЙТИ</button>
    </form>
  );
}

export default Login;
