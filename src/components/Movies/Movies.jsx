import './Movies.css';

import {
  DESKTOP_WIDTH,
  NUMBER_CARDS_ADD_FOR_DESKTOP,
  NUMBER_CARDS_ADD_FOR_MOBILE_GADGETS,
  NUMBER_CARDS_FOR_DESKTOP,
  NUMBER_CARDS_FOR_MOBILE,
  NUMBER_CARDS_FOR_TABLET,
  TABLET_WIDTH,
} from '../../utils/constants';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
  const cards = useMemo(
    () => moviesList.filter((movie, index) => index < showMoviesLength),
    [moviesList, showMoviesLength],
  );

  const handleMoreClick = useCallback(() =>
  {
    setShowMoviesLength((prev) =>
    {
      const next = prev + addMoviesCount;
      return next > moviesLength ? moviesLength : next;
    });
  }, [addMoviesCount, moviesLength]);
  // Обработчик изменения размера окна
  useEffect(() =>
  {
    const handleResize = () =>
    {
      setScreenWidth(window.innerWidth);
      setAddMoviesCount(getAddCount(window.innerWidth));
      setShowMoviesLength(getBaseCount());
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () =>
    {
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
