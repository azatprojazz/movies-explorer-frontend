import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search-form section-container" aria-label="Форма для поиска фильмов">
      <form className="search-form__form">
        <input
          className="search-form__input"
          placeholder="Фильм"
          required
          type="text"
          name="search"
          id="search"
          autoComplete="off"
        />
        <button className="search-form__btn" type="submit"></button>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
