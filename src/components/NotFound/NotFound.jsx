import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <main className="not-found mobile-container-large">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__description">Страница не найдена</p>
      <Link to="/" className="not-found__link">
        Назад
      </Link>
    </main>
  );
}

export default NotFound;
