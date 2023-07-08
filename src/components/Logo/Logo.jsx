import { Link } from 'react-router-dom';
import './Logo.css';
import headerLogo from '../../images/logo.svg';

function Logo() {
  return (
    <Link to="/">
      <img className="logo" src={headerLogo} alt="Логотип"></img>
    </Link>
  );
}

export default Logo;
