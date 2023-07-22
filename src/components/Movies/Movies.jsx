import './Movies.css';

import {
  DESKTOP_WIDTH,
  NUMBER_CARDS_ADD_FOR_DESKTOP,
  NUMBER_CARDS_ADD_FOR_MOBILE_GADGETS,
  NUMBER_CARDS_FOR_DESKTOP,
  NUMBER_CARDS_FOR_MOBILE,
  NUMBER_CARDS_FOR_TABLET,
  TABLET_WIDTH,
  TIMEOUT_FOR_RESIZE,
} from '../../utils/constants';
import { useCallback, useEffect, useState } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function Movies({
  isLoading,
  isSearched,
  isSuccess,
  moviesList,
  onAddMovie,
  onDelete,
  onError,
  onFilterMovies,
  onFilterShortMovies,
  savedMoviesList,
}) {
  // Общее количество фильмов
  const moviesLength = moviesList.length;
  // Состояние для отображения определенного количества фильмов
  const [showMoviesLength, setShowMoviesLength] = useState(0);
  // Состояние для отображения дополнительных фильмов при нажатии кнопки "Еще"
  const [addMoviesCount, setAddMoviesCount] = useState(0);
  // Состояние для текущей ширины экрана
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Функция для получения базового количества фильмов в зависимости от ширины экрана
  const getBaseCount = useCallback(() => {
    if (screenWidth > DESKTOP_WIDTH) {
      return NUMBER_CARDS_FOR_DESKTOP;
    }
    if (screenWidth > TABLET_WIDTH) {
      return NUMBER_CARDS_FOR_TABLET;
    }
    return NUMBER_CARDS_FOR_MOBILE;
  }, [screenWidth]);

  // Функция для получения количества дополнительных фильмов в зависимости от ширины экрана
  const getAddCount = useCallback(
    (width = screenWidth) => {
      if (width > DESKTOP_WIDTH) {
        return NUMBER_CARDS_ADD_FOR_DESKTOP;
      }
      return NUMBER_CARDS_ADD_FOR_MOBILE_GADGETS;
    },
    [screenWidth],
  );

  // Фильтрация списка фильмов для отображения на основе showMoviesLength
  const cards = moviesList.filter((_, index) => index < showMoviesLength);
  // Обработчик нажатия на кнопку "Еще"
  const handleMoreClick = useCallback(() => {
    setShowMoviesLength((prev) => {
      const next = prev + addMoviesCount;
      return next > moviesLength ? moviesLength : next;
    });
  }, [addMoviesCount, moviesLength]);
  // Обработчик изменения размера окна
  useEffect(() => {
    let timeoutId = null;
    // Функция-обработчик изменения размера окна
    const handleResize = () => {
      // Отменяем предыдущий таймаут, если он был установлен
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Задерживаем обновление состояний screenWidth, addMoviesCount и showMoviesLength
      // до окончания изменения размера окна, чтобы избежать ненужных ререндеров
      timeoutId = setTimeout(() => {
        setScreenWidth(window.innerWidth);
        setAddMoviesCount(getAddCount(window.innerWidth));
        setShowMoviesLength(getBaseCount());
      }, TIMEOUT_FOR_RESIZE);
    };
    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
    return () => {
      // Удаляем обработчик и отменяем таймаут при очистке эффекта
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [getAddCount, getBaseCount]);

  return (
    <main className="movies">
      <SearchForm
        onFilterMovies={onFilterMovies}
        onFilterShortMovies={onFilterShortMovies}
        isLoading={isLoading}
        onError={onError}
      />
      {isLoading && <Preloader />}
      {!isLoading && isSearched && (
        <MoviesCardList
          onAddClick={onAddMovie}
          onDeleteClick={onDelete}
          moviesList={cards}
          savedMoviesList={savedMoviesList}
          isSuccess={isSuccess}
        />
      )}
      {moviesLength > showMoviesLength ? (
        <button className="movies__button" type="button" onClick={handleMoreClick}>
          Ещё
        </button>
      ) : null}
    </main>
  );
}

export default Movies;
