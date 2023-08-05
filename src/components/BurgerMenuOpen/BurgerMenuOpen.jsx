import './BurgerMenuOpen.css';

import { useLocation } from 'react-router-dom';

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
