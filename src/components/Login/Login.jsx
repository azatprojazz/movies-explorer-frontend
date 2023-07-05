import { useState } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import './Login.css';

function Login({ onSubmit }) {
  const [email, setEmail] = useState('pochta@yandex.ru');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <main className="login">
      <AuthPage
        title="Рады видеть!"
        btnText="Войти"
        questionText="Ещё не зарегистрированы?"
        url="/signup"
        linkText="Регистрация"
        name="login"
        onSubmit={handleSubmit}
        place="login"
        autorize="login"
      >
        <label htmlFor="email" className="login__input-label">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="login__input"
          placeholder="Введите email"
          autoComplete="off"
          required
        />
        <span className="login__input-error"></span>

        <label htmlFor="password" className="login__input-label">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          name="password"
          minLength="6"
          maxLength="30"
          value={password}
          onChange={handlePasswordChange}
          className="login__input login__input_type_password"
          placeholder="Введите пароль"
          autoComplete="off"
          required
        />
        <span className="login__input-error"></span>
      </AuthPage>
    </main>
  );
}

export default Login;
