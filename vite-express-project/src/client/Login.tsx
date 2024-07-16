function Login() {
  return (
    <form method="post" action="/login">
      <input type="email" placeholder="E-MAIL" name="email" required />
      <input type="password" placeholder="Пароль" name="password" required />
      <button type="submit">ВОЙТИ</button>
    </form>
  );
}

export default Login;
