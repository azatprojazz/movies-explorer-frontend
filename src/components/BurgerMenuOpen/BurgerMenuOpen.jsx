import { useLocation } from 'react-router-dom';
import './BurgerMenuOpen.css';

function BurgerMenuOpen({ onOpenBurger, isLoggedIn }) {
  const location = useLocation();
  return (
    <button
      className={`burger-menu-open ${
        location.pathname === '/' && !isLoggedIn && 'burger-menu-open_is_hidden'
      }`}
      type="button"
      onClick={onOpenBurger}
    ></button>
  );
}

export default BurgerMenuOpen;
