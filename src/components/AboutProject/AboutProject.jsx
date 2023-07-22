import './AboutProject.css';

import React from 'react';

function AboutProject() {
  return (
    <section
      className="about-project section-container tablet-container-large mobile-container-medium"
      aria-label="Сведения о проекте"
      id="about-project"
    >
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__list">
        <li>
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__descr">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности
            и&nbsp;финальные доработки.
          </p>
        </li>
        <li>
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__descr">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__line">
        <li>
          <h4 className="about-project__line-title about-project__line-title_active">
            1&nbsp;неделя
          </h4>
          <p className="about-project__line-subtitle">Back-end</p>
        </li>
        <li>
          <h4 className="about-project__line-title">4&nbsp;недели</h4>
          <p className="about-project__line-subtitle">Front-end</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;
