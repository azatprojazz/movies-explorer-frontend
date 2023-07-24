import './Login.css';

import AuthPage from '../AuthPage/AuthPage';
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onSubmit, isLoading, isLoggedIn }) {
  const { values, errors, isFormValid, handleChange } = useForm({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Логин';
  }, []);

  useEffect(() => {
    isLoggedIn && navigate('/');
  }, [isLoggedIn, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email: values.email, password: values.password });
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
        isFormValid={isFormValid}
      >
        <label htmlFor="email" className="login__input-label">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className={`login__input ${!isFormValid && errors.email && 'login__input_invalid'}`}
          placeholder="Введите email"
          autoComplete="off"
          required
          disabled={isLoading}
        />
        <span
          className={`login__input-error ${
            !isFormValid && errors.email ? 'login__input-error_active' : ''
          }`}
        >
          {errors.email || ''}
        </span>

        <label htmlFor="password" className="login__input-label">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          name="password"
          minLength="8"
          maxLength="30"
          value={values.password}
          onChange={handleChange}
          className={`login__input ${!isFormValid && errors.password && 'login__input_invalid'}`}
          placeholder="Введите пароль"
          autoComplete="off"
          required
          disabled={isLoading}
        />
        <span
          className={`login__input-error ${
            !isFormValid && errors.password ? 'login__input-error_active' : ''
          }`}
        >
          {errors.password || ''}
        </span>
      </AuthPage>
    </main>
  );
}

export default Login;
