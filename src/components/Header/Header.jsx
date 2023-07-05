import { useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import BurgerMenuOpen from '../BurgerMenuOpen/BurgerMenuOpen';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header({ isLoggedIn, isBurgerOpen, onOpenBurger, onCloseBurger }) {
  // Использование хука useLocation для получения текущего пути (pathname)
  const { pathname } = useLocation();

  // Создание класса для компонента header, зависящего от текущего маршрута.
  const headerClass = `header ${
    pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile'
      ? 'header_path_movies'
      : ''
  }`;

  return (
    <header className={headerClass}>
      <div className="header__container section-container">
        <Logo />
        <Navigation isLoggedIn={isLoggedIn} />
        <BurgerMenuOpen onOpenBurger={onOpenBurger} isLoggedIn={isLoggedIn} />
        <BurgerMenu isOpen={isBurgerOpen} onClose={onCloseBurger} />
      </div>
    </header>
  );
}

export default Header;
