import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';
import AccountBtn from '../AccountBtn/AccountBtn';

// Вспомогательная функция для проверки, соответствует ли текущий pathname путям, связанным с фильмами
const isMoviesPath = (pathname) =>
  pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile';

// Вспомогательная функция для проверки, является ли текущий путь главной страницей
const isMainPath = (pathname, isLoggedIn) => pathname === '/' && isLoggedIn;

// Функция для вычисления класса навигации в зависимости от текущего пути
const navigationClassName = (pathname, isLoggedIn) =>
  `navigation ${isMoviesPath(pathname) ? 'navigation_path_movies' : ''}`;

// Функция для вычисления класса NavLink в зависимости от активного состояния и местоположения
const getNavLinkClassName = (isActive, isMain) =>
  `navigation__list-navlink ${isMain ? 'navigation__list-navlink_place_main' : ''}${
    isActive ? 'navigation__list-navlink_active' : ''
  }`;

function Navigation({ isLoggedIn }) {
  const { pathname } = useLocation();

  // Показать кнопку фильмов, если пользователь находится на главной странице и авторизован, или если находится на страницах, связанных с фильмами
  const showMoviesButton = (pathname === '/' && isLoggedIn) || isMoviesPath(pathname);

  return (
    <nav className={navigationClassName(pathname, isLoggedIn)}>
      <ul className="navigation__list">
        {showMoviesButton && (
          <li>
            <ul className="navigation__movies-menu">
              <li>
                <NavLink
                  to="/movies"
                  className={({ isActive }) => getNavLinkClassName(isActive, false)}
                >
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/saved-movies"
                  className={({ isActive }) =>
                    getNavLinkClassName(isActive, isMainPath(pathname, isLoggedIn))
                  }
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
              <li className="navigation__list-item navigation__list-item_style_account">
                <AccountBtn />
              </li>
            </ul>
          </li>
        )}
        {/* Если пользователь не авторизован, показать кнопки регистрации и входа */}
        {!isLoggedIn && (
          <li>
            <ul className="navigation__main-menu">
              <li>
                <Link
                  className={`navigation__list-link ${
                    pathname === '/' ? 'navigation__list-link_visible' : ''
                  }`}
                  to="/signup"
                >
                  Регистрация
                </Link>
              </li>
              <li>
                <Link
                  className={`navigation__list-link navigation__list-link_style_signin ${
                    pathname === '/' ? 'navigation__list-link_visible' : ''
                  }`}
                  to="/signin"
                >
                  Войти
                </Link>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
