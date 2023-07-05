import './MoviesCard.css';

function MoviesCard({ imageUrl, name, duration, button, onButtonClick }) {
  return (
    <li className="movies-card">
      <img className="movies-card__img" src={imageUrl} alt={name} />
      <button
        className={`movies-card__btn movies-card__btn_type_${button}`}
        type="button"
        onClick={onButtonClick}
      >
        {button === 'save' ? 'Сохранить' : ''}
      </button>
      <div className="movies-card__container">
        <p className="movies-card__descr">{name}</p>
        <span className="movies-card__time">{duration}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
