import './Register.css';

import AuthPage from '../AuthPage/AuthPage';
import { NAME_PATTERN } from '../../utils/constants';
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ onSubmit, isLoading, isLoggedIn }) {
  const { values, errors, isFormValid, handleChange } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Регистрация';
  }, []);

  useEffect(() => {
    isLoggedIn && navigate('/');
  }, [isLoggedIn, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email: values.email, password: values.password, name: values.name });
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
        isFormValid={isFormValid}
      >
        <label htmlFor="name" className="register__input-label">
          Имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`register__input ${!isFormValid && errors.name && 'register__input_invalid'}`}
          minLength="2"
          maxLength="30"
          autoComplete="off"
          value={values.name}
          onChange={handleChange}
          placeholder="Введите имя"
          required
          pattern={NAME_PATTERN}
          disabled={isLoading}
        />
        <span
          className={`register__input-error ${
            !isFormValid && errors.name ? 'register__input-error_active' : ''
          }`}
        >
          {errors.name || ''}
        </span>
        <label htmlFor="email" className="register__input-label">
          E-mail
        </label>
        <input
          className={`register__input ${!isFormValid && errors.email && 'register__input_invalid'}`}
          type="email"
          id="email"
          name="email"
          maxLength="50"
          autoComplete="off"
          value={values.email}
          onChange={handleChange}
          placeholder="Введите email"
          required
          disabled={isLoading}
        />
        <span
          className={`register__input-error ${
            !isFormValid && errors.email ? 'register__input-error_active' : ''
          }`}
        >
          {errors.email || ''}
        </span>
        <label htmlFor="password" className="register__input-label">
          Пароль
        </label>
        <input
          className={`register__input ${
            !isFormValid && errors.password && 'register__input_invalid'
          }`}
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          minLength="8"
          maxLength="30"
          value={values.password}
          onChange={handleChange}
          placeholder="Введите пароль"
          required
          disabled={isLoading}
        />
        <span
          className={`register__input-error ${
            !isFormValid && errors.password ? 'register__input-error_active' : ''
          }`}
        >
          {errors.password || ''}
        </span>
      </AuthPage>
    </main>
  );
}

export default Register;
