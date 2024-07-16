function Registration() {
  return (
    <form method="post" action="/registration">
      <input type="text" name="name" placeholder="Имя пользователя" required />
      <input type="email" name="email" placeholder="E-MAIL" required />
      <input type="password" name="password" placeholder="Пароль" required />
      <input type="password" name="rpassword" placeholder="Повторите пароль" required />
      <button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</button>
    </form>
  );
}

export default Registration;
