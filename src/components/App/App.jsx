// Импорт стилей приложения
import './App.css';

// Импорт констант для работы приложения
import {
  BASE_URL,
  CHECKED_SAVE,
  DATA_USER_UPDATE,
  FILTER_CHECKBOX,
  FOUND_MOVIES,
  INFO_TOOLTIP,
  JWT,
  MOVIES,
  SAVED_MOVIES,
  SEARCH,
  SHORT_MOVIE_DURATION,
} from '../../utils/constants';
// Импорт необходимых для роутинга библиотек и функциональных хуков
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

// Импорт контекста и компонентов приложения
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
// Импорт модулей для работы с API
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

// Главный компонент приложения
function App() {
  // Инициализация стейтов для управления состоянием пользователя, загрузкой страницы, состоянием фильмов и т.д.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [isSavedMoviesLoading, setIsSavedMoviesLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSuccess, setIsSuccess] = useState(true);
  const [serverError, setServerError] = useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [savedFilteredMoviesList, setSavedFilteredMoviesList] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [isTooltipSuccess, setIsTooltipSuccess] = useState(true);

  // Использование хуков для управления роутингом
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Хук для открытия всплывающей подсказки
  const openTooltip = useCallback(() => {
    setIsTooltipOpen(true);
  }, []);

  // Функция для закрытия всплывающей подсказки
  const closeTooltip = () => {
    setIsTooltipOpen(false);
  };

  // Обработчик ошибок, который открывает всплывающую подсказку с сообщением об ошибке
  const handleError = useCallback(
    (err) => {
      setIsTooltipSuccess(false);
      setTooltipMessage(err ? err : INFO_TOOLTIP);
      openTooltip();
    },
    [openTooltip],
  );

  // Проверка токена при загрузке страницы и получение информации о пользователе
  useEffect(() => {
    const validateToken = async () => {
      setIsPageLoading(true);
      try {
        const jwt = localStorage.getItem(JWT);
        if (jwt) {
          const userData = await mainApi.getUserInfo();
          if (userData) {
            setIsLoggedIn(true);
            setCurrentUser(userData);
          }
        }
      } catch (err) {
        console.log(err);
        handleError(err);
      } finally {
        setIsPageLoading(false);
      }
    };
    validateToken();
  }, [handleError]);

  // Фильтруем фильмы
  const filterMovies = (movies, search, isChecked) => {
    // Ищем по запросу в названиях
    const foundMovies = search
      ? movies.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(search.toLowerCase()),
        )
      : movies;
    // Фильтруем по длительности, если нужно
    const newMoviesList = isChecked
      ? foundMovies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION)
      : foundMovies;
    // Возвращаем отфильтрованный список
    return newMoviesList;
  };

  // Обработчик фильтрации данных фильмов
  const handleFilterMoviesData = useCallback(async (search, isChecked) => {
    // Устанавливаем флаг поиска
    setIsSearched(true);
    // Получаем данные из локального хранилища
    const savedInLs = localStorage.getItem(MOVIES);
    // Показываем лоадер, если данных нет
    if (!savedInLs) {
      setIsMoviesLoading(true);
    }
    try {
      const moviesData = savedInLs ? JSON.parse(savedInLs) : await moviesApi.getMovies();
      // Сохраняем полученные данные в хранилище
      localStorage.setItem(MOVIES, JSON.stringify(moviesData));
      // Фильтруем данные
      const newMoviesList = filterMovies(moviesData, search, isChecked);
      // Сохраняем отфильтрованный список
      localStorage.setItem(FOUND_MOVIES, JSON.stringify(newMoviesList));
      // Обновляем стейт
      setMoviesList(newMoviesList);
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
    } finally {
      // Скрываем лоадер
      setIsMoviesLoading(false);
    }
  }, []);

  // Получение данных о фильмах
  const getMovies = useCallback(async () => {
    // Получаем данные из хранилища
    const savedSearch = localStorage.getItem(SEARCH);
    const savedCheckbox = localStorage.getItem(FILTER_CHECKBOX);
    // Запускаем фильтрацию, если есть сохраненные данные
    if (savedSearch || savedCheckbox) {
      handleFilterMoviesData(savedSearch ?? '', savedCheckbox === 'true' || false);
    }
  }, [handleFilterMoviesData]);

  // Вызов функции получения данных о фильмах при изменении стейта isLoggedIn
  useEffect(() => {
    isLoggedIn && getMovies();
  }, [getMovies, isLoggedIn]);

  // Обработчик фильтрации сохраненных фильмов
  const handleFilterSavedMovies = useCallback(
    (search, isChecked) => {
      // Показываем loader при фильтрации
      setIsSavedMoviesLoading(true);
      try {
        // Фильтруем сохраненные фильмы
        // Используем ту же функцию filterMovies
        const newMoviesList = filterMovies(savedMoviesList, search, isChecked);
        // Сохраняем отфильтрованный список в стейте
        setSavedFilteredMoviesList(newMoviesList);
      } catch (err) {
        console.log(err);
        handleError(err);
      } finally {
        setIsSavedMoviesLoading(false);
      }
    },
    [handleError, savedMoviesList],
  );

  // Получение сохраненных фильмов
  const getSavedMovies = useCallback(async () => {
    try {
      // Запрос к API за сохраненными фильмами
      const moviesData = await mainApi.getSavedMovies();
      // Сохраняем в локальном хранилище
      // Чтобы не делать лишних запросов
      localStorage.setItem(SAVED_MOVIES, JSON.stringify(moviesData));
      setSavedMoviesList(moviesData);
      setSavedFilteredMoviesList(moviesData);
    } catch (err) {
      console.log(err);
      handleError(err);
    }
  }, [handleError]);

  // Вызов функции получения сохраненных фильмов при изменении стейта isLoggedIn
  useEffect(() => {
    isLoggedIn && getSavedMovies();
  }, [getSavedMovies, isLoggedIn]);

  // Обработчик входа в систему
  const handleLogin = async ({ email, password }) => {
    try {
      const { data } = await mainApi.loginUser({ email, password });
      setCurrentUser(data);
      navigate('/movies', { replace: true });
      setIsLoggedIn(true);
      localStorage.setItem(JWT, 'true');
    } catch (err) {
      console.log(err);
      handleError(err);
      setIsLoggedIn(false);
    }
  };

  // Обработчик регистрации
  const handleRegister = async ({ name, email, password }) => {
    try {
      const { data } = await mainApi.registerUser({ name, email, password });
      if (data) {
        handleLogin({ email, password });
      }
    } catch (err) {
      console.log(err);
      handleError(err);
      setIsLoggedIn(false);
    }
  };

  // Обработчик обновления профиля пользователя
  const handleProfileUpdate = async ({ name, email }) => {
    try {
      const user = await mainApi.editUserInfo({ name, email });
      setCurrentUser(user);
      setServerError(DATA_USER_UPDATE);
      setIsSuccess(true);
    } catch (err) {
      setServerError(err);
      setIsSuccess(false);
      console.log(err);
      handleError(err);
    }
  };

  // Обработчик добавления фильма
  const handleAddMovie = async (movieData) => {
    try {
      const addedMovie = await mainApi.createMovie({
        ...movieData,
        movieId: movieData.id,
        image: `${BASE_URL}${movieData.image.url}`,
        thumbnail: `${BASE_URL}${movieData.image.formats.thumbnail.url}`,
      });
      const updatedSavedMoviesList = [...savedMoviesList, addedMovie];
      setSavedMoviesList(updatedSavedMoviesList);
      localStorage.setItem(SAVED_MOVIES, JSON.stringify(updatedSavedMoviesList));
    } catch (err) {
      console.log(err);
      handleError(err);
    }
  };

  // Эффект для фильтрации сохранённых фильмов по продолжительности при изменении соответствующего стейта.
  // Если в localStorage сохранена информация о фильтрации, то применяет фильтр к списку сохранённых фильмов.
  useEffect(() => {
    if (localStorage.getItem(CHECKED_SAVE) === 'true') {
      const filteredMovies = savedMoviesList.filter(
        (movie) => movie.duration <= SHORT_MOVIE_DURATION,
      );
      setSavedFilteredMoviesList(filteredMovies);
    } else {
      setSavedFilteredMoviesList(savedMoviesList);
    }
  }, [savedMoviesList]);

  // Обработчик удаления фильма
  const handleDeleteClick = async (movieId) => {
    try {
      await mainApi.deleteCard(movieId);
      const updatedSavedMoviesList = savedMoviesList.filter((movie) => movie._id !== movieId);
      setSavedMoviesList(updatedSavedMoviesList);
      localStorage.setItem(SAVED_MOVIES, JSON.stringify(updatedSavedMoviesList));
    } catch (err) {
      console.log(err);
      handleError(err);
    }
  };

  // Обработчик фильтрации коротких фильмов
  const handleFilterShortMovies = (checked) => {
    if (checked) {
      const filteredMovies = moviesList.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
      setMoviesList(filteredMovies);
    } else {
      const foundMoviesInLs = JSON.parse(localStorage.getItem(FOUND_MOVIES));
      setMoviesList(foundMoviesInLs ? foundMoviesInLs : []);
    }
  };

  // Обработчик фильтрации коротких сохраненных фильмов
  const handleFilterShortSavedMovies = (checked) => {
    localStorage.setItem(CHECKED_SAVE, checked);
    const foundMoviesInLs = JSON.parse(localStorage.getItem(SAVED_MOVIES));
    if (checked) {
      const filteredMovies = foundMoviesInLs.filter(
        (movie) => movie.duration <= SHORT_MOVIE_DURATION,
      );
      setSavedFilteredMoviesList(filteredMovies);
    } else {
      setSavedMoviesList(foundMoviesInLs ? foundMoviesInLs : []);
    }
  };

  // Обработчик выхода из системы
  const handleLogout = async () => {
    try {
      await mainApi.logout();
      localStorage.clear();
      setIsLoggedIn(false);
      setCurrentUser({});
      setMoviesList([]);
      setIsSearched(false);
      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  // Сброс сообщения об ошибке на сервере
  const resetServerError = () => {
    setServerError('');
  };

  // Сброс состояния успеха
  const resetSuccessState = () => {
    setIsSuccess(true);
  };

  // Компоненты для роутинга
  const mainComponent = <Main />;
  const moviesComponent = (
    <ProtectedRoute
      component={Movies}
      isSearched={isSearched}
      isLoading={isMoviesLoading}
      isSuccess={isSuccess}
      loggedIn={isLoggedIn}
      moviesList={moviesList}
      onAddMovie={handleAddMovie}
      onDelete={handleDeleteClick}
      onError={handleError}
      onFilterMovies={handleFilterMoviesData}
      onFilterShortMovies={handleFilterShortMovies}
      savedMoviesList={savedMoviesList}
    />
  );
  const savedMoviesComponent = (
    <ProtectedRoute
      component={SavedMovies}
      isSuccess={isSuccess}
      isLoading={isSavedMoviesLoading}
      loggedIn={isLoggedIn}
      onDelete={handleDeleteClick}
      onFilterMovies={handleFilterSavedMovies}
      onFilterShortMovies={handleFilterShortSavedMovies}
      savedMoviesList={savedFilteredMoviesList}
    />
  );
  const profileComponent = (
    <ProtectedRoute
      component={Profile}
      isSuccess={isSuccess}
      loggedIn={isLoggedIn}
      onLogout={handleLogout}
      resetServerError={resetServerError}
      resetSuccessState={resetSuccessState}
      serverError={serverError}
      onSave={handleProfileUpdate}
    />
  );
  const registerComponent = <Register onSubmit={handleRegister} />;
  const loginComponent = <Login onSubmit={handleLogin} />;
  const notFoundComponent = <NotFound />;

  // Если страница все еще загружается, отображаем прелоадер
  if (isPageLoading) {
    return <Preloader />;
  }

  // Функция для определения, какой компонент отображать на основе текущего пути
  const displayComponent = (routes) => routes.includes(pathname);

  // Основной рендер компонента
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {displayComponent(['/', '/movies', '/saved-movies', '/profile']) && (
          <Header isLoggedIn={isLoggedIn} />
        )}
        <Routes>
          <Route path="/" element={mainComponent} />
          <Route path="/movies" element={moviesComponent} />
          <Route path="/saved-movies" element={savedMoviesComponent} />
          <Route path="/profile" element={profileComponent} />
          <Route path="/signup" element={registerComponent} />
          <Route path="/signin" element={loginComponent} />
          <Route path="*" element={notFoundComponent} />
        </Routes>
        {displayComponent(['/', '/movies', '/saved-movies']) && <Footer />}
        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeTooltip}
          isSuccess={isTooltipSuccess}
          message={tooltipMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
