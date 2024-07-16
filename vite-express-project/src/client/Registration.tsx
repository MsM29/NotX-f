import React, { useState } from "react";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repassword, setRepassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === repassword) {
      const data = JSON.stringify({ name, email, password });
      try {
        const response = await fetch("/registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        });

        if (!response.ok) {
          throw new Error("Ошибка регистрации");
        }
        console.log("Регистрация прошла успешно");
      } catch (error) {
        console.error("Ошибка регистрации:", error);
      }
    } else {
      alert("Введенные пароли отличаются");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
        required
      />
      <input
        type="password"
        placeholder="Повторите пароль"
        value={repassword}
        onChange={(e) => setRepassword(e.target.value)}
        required
      />
      <button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</button>
    </form>
  );
}

export default Registration;
