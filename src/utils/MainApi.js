import { MY_API } from './constants';

class MainApi {
  // Конструктор класса, принимает на вход объект с настройками API
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Функция для обработки ответа от сервера
  _response(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err.message));
  }

  // Общая функция для выполнения запросов к API
  async _fetch(url, options = {}) {
    const res = await fetch(`${this._baseUrl}${url}`, {
      ...options,
      credentials: 'include',
      headers: this._headers,
    });
    return this._response(res);
  }

  // Получение информации о пользователе
  getUserInfo() {
    return this._fetch('/users/me');
  }

  // Редактирование информации о пользователе
  editUserInfo({ name, email }) {
    return this._fetch('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name, email }),
    });
  }

  // Регистрация нового пользователя
  registerUser({ name, email, password }) {
    return this._fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  // Аутентификация пользователя
  loginUser({ email, password }) {
    return this._fetch('/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Получение сохраненных фильмов
  getSavedMovies() {
    return this._fetch('/movies');
  }

  // Создание нового фильма
  createMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  }) {
    return this._fetch('/movies', {
      method: 'POST',
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    });
  }

  // Удаление фильма
  deleteCard(movieId) {
    return this._fetch(`/movies/${movieId}`, {
      method: 'DELETE',
    });
  }

  // Метод для выхода из системы (logout)
  logout() {
    return this._fetch('/signout', {
      method: 'GET',
    });
  }
}

// Создание экземпляра класса с настройками
export const mainApi = new MainApi({
  baseUrl: MY_API,
  headers: {
    'Content-Type': 'application/json',
  },
});
