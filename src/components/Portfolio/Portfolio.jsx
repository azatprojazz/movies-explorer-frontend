import './Portfolio.css';

import React from 'react';

function Portfolio() {
  return (
    <section
      className="portfolio section-container tablet-container-large"
      aria-label="Ссылки на портфолио"
    >
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://azatprojazz.github.io/how-to-learn/"
          >
            <p className="portfolio__subtitle">Статичный сайт</p>
            <span className="portfolio__arrow">↗</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://azatprojazz.github.io/russian-travel/"
          >
            <p className="portfolio__subtitle">Адаптивный сайт</p>
            <span className="portfolio__arrow">↗</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://azatprojazz.github.io/react-mesto-auth/"
          >
            <p className="portfolio__subtitle">Одностраничное приложение</p>
            <span className="portfolio__arrow">↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
