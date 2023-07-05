import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({ initialMovies, onLoadMore }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList initialMovies={initialMovies} />
      <button className="movies__button" type="button" onClick={onLoadMore}>
        Ещё
      </button>
    </main>
  );
}

export default Movies;
