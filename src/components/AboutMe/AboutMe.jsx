import './AboutMe.css';

import React from 'react';
import profilePhoto from '../../images/profilePhoto.gif';

function AboutMe() {
  return (
    <section
      className="about-me section-container tablet-container-large"
      aria-label="Информация о студенте"
      id="about-me"
    >
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <h3 className="about-me__subtitle">Азат</h3>
        <p className="about-me__job">Фронтенд-разработчик, 30&nbsp;лет</p>
        <p className="about-me__info">
          В&nbsp;2015 году я&nbsp;переехал в&nbsp;Санкт-Петербург, где позже получил высшее
          музыкальное образование. Несмотря на&nbsp;это, с&nbsp;самого детства меня тянуло
          к&nbsp;технологиям, компьютеру и&nbsp;всему что с&nbsp;этим связано. Поэтому
          я&nbsp;увлекся веб-разработкой и&nbsp;сейчас заканчиваю программу обучения в&nbsp;Яндекс
          Практикуме. На&nbsp;этом сайте вы&nbsp;можете наблюдать мои успехи.
        </p>
        <ul className="about-me__list">
          <li className="about-me__list-item">
            <a
              className="about-me__link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/azatprojazz"
            >
              Github
            </a>
          </li>
        </ul>
        <img
          className="about-me__img"
          src={profilePhoto}
          alt="Изображение автора"
          draggable="false"
        />
      </div>
    </section>
  );
}

export default AboutMe;
