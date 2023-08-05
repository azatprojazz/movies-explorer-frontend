import './MoviesCardList.css';

import { BASE_URL, NO_MOVIES_DATA, SERVER_ERROR } from '../../utils/constants';

import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

// Функция для конвертации минут в часы и минуты
function convertMinutesToHours(minutes) {
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;
  return `${hours}ч ${min}м`;
}

function MoviesCardList({
  moviesList,
  savedMoviesList,
  button,
  onDeleteClick,
  onAddClick,
  isSuccess,
}) {
  // Получаем текущий путь
  const { pathname } = useLocation();
  // Определяем, является ли текущая страница страницей сохраненных фильмов
  const isSavedMovies = pathname === '/saved-movies';

  // Определяем класс для списка карточек
  const moviesCardListClass = `movies-card-list section-container mobile-container-large ${
    isSavedMovies ? 'movies-card-list_padding-bottom_small' : ''
  }`;

  // Обработчик удаления фильма
  const handleDeleteMovie = (movieId) => () => {
    const savedMovie = (isSavedMovies ? moviesList : savedMoviesList)?.find(
      (movie) => movie.movieId === movieId,
    );

    if (savedMovie) {
      onDeleteClick(savedMovie._id);
    }
  };

  // Обработчик добавления фильма
  const handleAddMovie = (movieData) => () => {
    onAddClick(movieData);
  };

  // Функция для определения, сохранен ли фильм
  const getIsSavedMovie = (id) => {
    return isSavedMovies || savedMoviesList?.some((movie) => movie.movieId === id);
  };

  return (
    <section className={moviesCardListClass} aria-label="Секция с фильмами">
      {moviesList.length ? (
        // Если список фильмов не пуст, рендерим карточки фильмов
        <ul className="movies-card-list__movies">
          {moviesList.map((movie) => {
            return (
              <li key={movie.id || movie._id}>
                <MoviesCard
                  trailerLink={movie.trailerLink}
                  name={movie.nameRU}
                  duration={convertMinutesToHours(movie.duration)}
                  imageUrl={`${isSavedMovies ? '' : BASE_URL}${
                    isSavedMovies ? movie.image : movie.image.url
                  }`}
                  button={button || (getIsSavedMovie(movie.id) ? 'saved' : 'save')}
                  onButtonClick={
                    getIsSavedMovie(movie.id)
                      ? handleDeleteMovie(movie.movieId ?? movie.id)
                      : handleAddMovie(movie)
                  }
                />
              </li>
            );
          })}
        </ul>
      ) : (
        // Если список фильмов пуст, показываем соответствующее сообщение
        <span
          className={`movies-card-list movies-card-list__not-movie ${
            !isSuccess ? 'movies-card-list__not-movie_error' : ''
          }`}
        >
          {isSuccess ? NO_MOVIES_DATA : SERVER_ERROR}
        </span>
      )}
    </section>
  );
}

export default MoviesCardList;
