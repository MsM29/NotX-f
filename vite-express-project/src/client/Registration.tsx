function Registration() {
  return (
    <form method="post" action="/registration">
      <input type="text" placeholder="Имя пользователя" required />
      <input type="email" placeholder="E-MAIL" required />
      <input type="password" placeholder="Пароль" required />
      <input type="password" placeholder="Повторите пароль" required />
      <button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</button>
    </form>
  );
}

export default Registration;
