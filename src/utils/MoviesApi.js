import { MOVIES_URL } from './constants';

class MoviesApi {
  // Конструктор класса, принимает на вход объект с настройками API
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  // Функция для обработки ответа от сервера
  _response(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  // Общая функция для выполнения запросов к API
  async _fetch(url, options = {}) {
    const res = await fetch(`${this._baseUrl}${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    return this._response(res);
  }

  // Получение списка фильмов
  getMovies() {
    return this._fetch('/', {
      method: 'GET',
    });
  }
}

// Создание экземпляра класса с настройками
export const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
});
