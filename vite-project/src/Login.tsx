function Login() {
  return (
    <form method="post" action="/login">
      <input type="email" placeholder="E-MAIL" required />
      <input type="password" placeholder="Пароль" required />
      <button type="submit">ВОЙТИ</button>
    </form>
  );
}

export default Login;
