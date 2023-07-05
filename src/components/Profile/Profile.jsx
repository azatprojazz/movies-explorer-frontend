import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Profile.css';
import Form from '../Form/Form';

function Profile({ user = { name: 'Виталий', email: 'pochta@yandex.ru' }, onLogout, onSave }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isEditing, setEditing] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleEditClick = () => setEditing(true);
  const handleSaveClick = (event) => {
    event.preventDefault();
    onSave({ name, email });
    setEditing(false);
  };
  const handleLogoutClick = (event) => {
    event.preventDefault();
    onLogout();
    navigate('/');
  };

  return (
    <section
      className="profile tablet-container-medium mobile-container-small"
      aria-label="Страница регистрации"
    >
      <h2 className="profile__title">Привет, {name}!</h2>
      <Form
        isProfileEdit={isEditing}
        btnText="Сохранить"
        place="profile"
        onSubmit={handleSaveClick}
      >
        <fieldset className="profile__fieldset" disabled={!isEditing}>
          <label htmlFor="name" className="profile__label">
            <span className="profile__descr">Имя</span>
            <input
              className="profile__input"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleNameChange}
              minLength="2"
              maxLength="30"
              required
              autoComplete="off"
            />
          </label>
          <label htmlFor="email" className="profile__label">
            <span className="profile__descr">E-mail</span>
            <input
              className="profile__input"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              minLength="2"
              maxLength="50"
              required
              autoComplete="off"
            />
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
