import './SavedMovies.css';

import { SAVED_MOVIES, ZERO_CARDS } from '../../utils/constants';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import { useEffect } from 'react';

function SavedMovies({
  isSuccess,
  isLoading,
  onDelete,
  onFilterMovies,
  savedMoviesList,
  onFilterShortMovies,
}) {
  // Чтение сохраненных фильмов из localStorage
  const savedMoviesInLs = JSON.parse(localStorage.getItem(SAVED_MOVIES));

  useEffect(() => {
    document.title = 'Сохраненные фильмы';
  }, []);

  return (
    <main className="saved-movies">
      {/* Форма поиска для фильтрации сохраненных фильмов */}
      <SearchForm onFilterMovies={onFilterMovies} onFilterShortMovies={onFilterShortMovies} />

      {/* Отображение прелоадера при загрузке */}
      {isLoading && <Preloader />}

      {/* Отображение списка сохраненных фильмов, если они есть и загрузка завершена */}
      {!isLoading && savedMoviesInLs.length > ZERO_CARDS && (
        <MoviesCardList
          isSuccess={isSuccess}
          moviesList={savedMoviesList}
          button="delete"
          onDeleteClick={onDelete}
        />
      )}
    </main>
  );
}

export default SavedMovies;
