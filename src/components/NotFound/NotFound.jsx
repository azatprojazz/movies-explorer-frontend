import { useEffect } from 'react';
import './NotFound.css';

import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Страница не найдена';
  }, []);

  const goBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <main className="not-found mobile-container-large">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__description">Страница не найдена</p>
      <button onClick={goBack} className="not-found__link">
        Назад
      </button>
    </main>
  );
}

export default NotFound;
