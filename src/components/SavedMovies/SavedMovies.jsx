import savedMovies from '../../utils/savedMovies';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList initialMovies={savedMovies} button="delete" />
    </main>
  );
}

export default SavedMovies;
