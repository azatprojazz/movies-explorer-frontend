import './BurgerMenuClose.css';

function BurgerMenuClose({ onClose }) {
  return <button className="burger-menu-close" type="button" onClick={onClose}></button>;
}

export default BurgerMenuClose;
