import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({ initialMovies, onLoadMore, isLoading }) {
  return (
    <main className="movies">
      <SearchForm />
      {isLoading ? <Preloader /> : <MoviesCardList initialMovies={initialMovies} />}
      <button className="movies__button" type="button" onClick={onLoadMore}>
        Ещё
      </button>
    </main>
  );
}

export default Movies;
