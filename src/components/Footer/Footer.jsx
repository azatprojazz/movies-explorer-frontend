import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer section-container mobile-container-large">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h3>
      <p className="footer__copy">&copy; 2023</p>
      <ul className="footer__list">
        <li className="footer__list-item">
          <a
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://praktikum.yandex.ru/"
          >
            Яндекс.Практикум
          </a>
        </li>
        <li className="footer__list-item">
          <a
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/"
          >
            Github
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
