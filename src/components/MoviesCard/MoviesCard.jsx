import './MoviesCard.css';

import { Link } from 'react-router-dom';

function MoviesCard({ imageUrl, name, duration, button, trailerLink, onButtonClick }) {
  return (
    <article className="movies-card">
      <img className="movies-card__img" src={imageUrl} alt={name} />
      <button
        className={`movies-card__btn movies-card__btn_type_${button}`}
        type="button"
        onClick={onButtonClick}
      >
        {button === 'save' ? 'Сохранить' : ''}
      </button>
      <Link className="movies-card__link" to={trailerLink} target="_blank" />
      <div className="movies-card__container">
        <p className="movies-card__descr">{name}</p>
        <span className="movies-card__time">{duration}</span>
      </div>
    </article>
  );
}

export default MoviesCard;
