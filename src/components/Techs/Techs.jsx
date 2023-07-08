import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className="techs" aria-label="Изученные технологии на курсе" id="techs">
      <div className="section-container tablet-container-large mobile-container-medium">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__text-subtitle">7&nbsp;технологий</h3>
        <p className="techs__text-descr">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__list-item">
            <a
              className="techs__link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://ru.wikipedia.org/wiki/HTML"
              title="Стандартизированный язык гипертекстовой разметки документов для просмотра веб-страниц в браузере"
            >
              HTML
            </a>
          </li>
          <li className="techs__list-item">
            <a
              className="techs__link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://ru.wikipedia.org/wiki/CSS"
              title="Формальный язык декорирования и описания внешнего вида документа (веб-страницы)"
            >
              CSS
            </a>
          </li>
          <li className="techs__list-item">
            <a
              className="techs__link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://ru.wikipedia.org/wiki/JavaScript"
              title="JavaScript обычно используется как встраиваемый язык для программного доступа к объектам приложений"
            >
              JS
            </a>
          </li>
          <li className="techs__list-item">
            <a
              className="techs__link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://ru.wikipedia.org/wiki/React"
              title="React может использоваться для разработки одностраничных и мобильных приложений"
            >
              React
            </a>
          </li>
          <li className="techs__list-item">
            <a
              className="techs__link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://ru.wikipedia.org/wiki/Git"
              title="Система управления версиями позволяет хранить несколько версий одного и того же документа"
            >
              Git
            </a>
          </li>
          <li className="techs__list-item">
            <a
              className="techs__link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://ru.wikipedia.org/wiki/Express.js"
              title="Программное обеспечение, облегчающее разработку и объединение разных компонентов большого программного проекта"
            >
              Express.js
            </a>
          </li>
          <li className="techs__list-item">
            <a
              className="techs__link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://ru.wikipedia.org/wiki/MongoDB"
              title="Документоориентированная система управления базами данных, не требующая описания схемы таблиц"
            >
              mongoDB
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
