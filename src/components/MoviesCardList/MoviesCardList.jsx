import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function convertMinutesToHours(minutes) {
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;
  return `${hours}ч ${min}м`;
}

function MoviesCardList({ initialMovies, button }) {
  const baseUrl = 'https://api.nomoreparties.co/';

  const { pathname } = useLocation();
  const moviesCardListClass = `movies-card-list section-container mobile-container-large ${
    pathname === '/saved-movies' ? 'movies-card-list_padding-bottom_small' : ''
  }`;

  return (
    <section className={moviesCardListClass} aria-label="Секция с фильмами">
      <ul className="movies-card-list__movies">
        {initialMovies.map((movie) => {
          return (
            <MoviesCard
              key={movie.id}
              name={movie.nameRU}
              duration={convertMinutesToHours(movie.duration)}
              imageUrl={`${baseUrl}${movie.image.url}`}
              button={button || (movie.id === 2 || movie.id === 6 ? 'saved' : 'save')}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
