import { useState } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import './Register.css';

function Register({ onSubmit }) {
  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('pochta@yandex.ru');
  const [password, setPassword] = useState('01234567654321');

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <main className="register">
      <AuthPage
        title="Добро пожаловать!"
        btnText="Зарегистрироваться"
        questionText="Уже зарегистрированы?"
        url="/signin"
        linkText="Войти"
        name="register"
        onSubmit={handleSubmit}
        place="register"
        autorize="register"
      >
        <label htmlFor="name" className="register__input-label">
          Имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="register__input"
          minLength="2"
          maxLength="30"
          autoComplete="off"
          value={name}
          onChange={handleNameChange}
          required
        />
        <span className="register__input-error"></span>
        <label htmlFor="email" className="register__input-label">
          E-mail
        </label>
        <input
          className="register__input"
          type="email"
          id="email"
          name="email"
          maxLength="50"
          autoComplete="off"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <span className="register__input-error"></span>
        <label htmlFor="password" className="register__input-label">
          Пароль
        </label>
        <input
          className="register__input register__input_type_password"
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          minLength="6"
          maxLength="30"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <span className="register__input-error">Что-то пошло не так...</span>
      </AuthPage>
    </main>
  );
}

export default Register;
