import './SearchForm.css';

import { FILTER_CHECKBOX, SAVED_MOVIES_SEARCH, SEARCH } from '../../utils/constants';
import { useCallback, useEffect, useState } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';

function SearchForm({ onFilterMovies, onFilterShortMovies, isLoading, onError }) {
  // Получение текущего пути
  const { pathname } = useLocation();
  const isMovies = pathname === '/movies';

  // Управление состоянием формы
  const [isFormReset, setFormReset] = useState(false);
  const { values, handleChange, resetForm } = useForm({ search: '' });

  // Управление состоянием чекбокса
  const [isChecked, setIsChecked] = useState(
    isMovies ? localStorage.getItem(FILTER_CHECKBOX) === 'true' : false,
  );

  // Обработчик отправки формы
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      isMovies && localStorage.setItem(SEARCH, values.search);
      if (!isMovies || values.search) {
        onFilterMovies(values.search, isChecked);
      } else {
        onError();
      }
    },
    [isChecked, isMovies, onFilterMovies, values.search, onError],
  );

  // Обработчик изменения чекбокса
  const handleShortMoviesChange = useCallback(
    (event) => {
      const checked = event.target.checked;
      setIsChecked(checked);
      if (isMovies) {
        localStorage.setItem(FILTER_CHECKBOX, checked);
      }
      onFilterShortMovies(checked);
    },
    [isMovies, onFilterShortMovies],
  );

  // Эффект для установки начального состояния формы на основе данных из localStorage
  useEffect(() => {
    if (!isFormReset) {
      const userSearch = isMovies
        ? localStorage.getItem(SEARCH)
        : localStorage.getItem(SAVED_MOVIES_SEARCH);
      resetForm({ search: userSearch || '' }, {}, false);
      setFormReset(true);
    }
  }, [isFormReset, resetForm, isMovies]);

  // Рендеринг
  return (
    <section className="search-form section-container" aria-label="Форма для поиска фильмов">
      <form onSubmit={handleSubmit} className="search-form__form" noValidate>
        <input
          className="search-form__input"
          placeholder="Фильм"
          required
          minLength={1}
          type="text"
          name="search"
          id="search"
          autoComplete="off"
          value={values.search || ''}
          onChange={handleChange}
        />
        <button className="search-form__btn" type="submit" disabled={isLoading}></button>
        <FilterCheckbox isChecked={isChecked} onChange={handleShortMoviesChange} />
      </form>
    </section>
  );
}

export default SearchForm;
