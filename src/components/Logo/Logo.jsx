import './Logo.css';

import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';

function Logo() {
  return (
    <Link to="/">
      <img className="logo" src={headerLogo} alt="Логотип"></img>
    </Link>
  );
}

export default Logo;
