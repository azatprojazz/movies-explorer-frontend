import './Profile.css';

import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Form from '../Form/Form';
import { NAME_PATTERN } from '../../utils/constants';
import { useForm } from '../../hooks/useForm';

function Profile({
  onLogout,
  onSave,
  serverError,
  isSuccess,
  resetServerError,
  resetSuccessState,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false); // используется для отображения состояния загрузки
  const [isEditing, setEditing] = useState(false);
  const { values, errors, isFormValid, handleChange } = useForm({
    name: currentUser.name,
    email: currentUser.email,
  });
  const navigate = useNavigate();

  const isUserDataMatch = currentUser.name === values.name && currentUser.email === values.email;

  const handleEditClick = () => {
    setEditing(true);
    resetServerError();
  };

  const handleLogoutClick = (event) => {
    event.preventDefault();
    onLogout();
    navigate('/');
  };

  const handleInputChange = (e) => {
    handleChange(e);
    resetServerError();
    resetSuccessState();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // обозначаем начало загрузки
    onSave(values);
    setIsLoading(false); // обозначаем начало загрузки
  };

  useEffect(() => {
    setEditing(false);
  }, [currentUser.email, currentUser.name]);

  return (
    <section
      className="profile tablet-container-medium mobile-container-small"
      aria-label="Страница регистрации"
    >
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <Form
        isProfileEdit={isEditing}
        btnText="Сохранить"
        place="profile"
        name="profile"
        isLoading={isLoading}
        isFormValid={isFormValid && !isUserDataMatch && !serverError && isSuccess}
        autorize="profile"
        handleSubmit={handleSubmit}
        errorText={serverError}
      >
        <fieldset className="profile__fieldset" disabled={!isEditing}>
          <label htmlFor="name" className="profile__label">
            <span className="profile__descr">Имя</span>
            <input
              className="profile__input"
              type="text"
              name="name"
              id="name"
              value={values.name || ''}
              onChange={handleInputChange}
              minLength="2"
              maxLength="30"
              required
              autoComplete="off"
              placeholder="Введите имя"
              pattern={NAME_PATTERN}
              disabled={isLoading}
            />
            <span className="profile__input-error">{errors.name}</span>
          </label>
          <label htmlFor="email" className="profile__label">
            <span className="profile__descr">E-mail</span>
            <input
              className="profile__input"
              type="email"
              name="email"
              id="email"
              value={values.email || ''}
              onChange={handleInputChange}
              minLength="2"
              maxLength="50"
              placeholder="Введите email"
              required
              autoComplete="off"
              disabled={isLoading}
            />
            <span className="profile__input-error">{errors.email}</span>
            {''}
          </label>
        </fieldset>
      </Form>
      {!isEditing && (
        <ul className="profile__list-link">
          <li>
            <Link onClick={handleEditClick} className="profile__list-item-link">
              Редактировать
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="profile__list-item-link profile__list-item-link_style_logout"
              onClick={handleLogoutClick}
            >
              Выйти из аккаунта
            </Link>
          </li>
        </ul>
      )}
    </section>
  );
}

export default Profile;
