import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import './AuthPage.css';

function AuthPage({
  title,
  btnText,
  questionText,
  url,
  linkText,
  name,
  onSubmit,
  autorize,
  place,
  children,
}) {
  return (
    <section
      className="auth-page tablet-container-small mobile-container-small"
      aria-label="Страница авторизации"
    >
      <Logo />
      <h2 className="auth-page__title">{title}</h2>
      <Form
        btnText={btnText}
        type={name}
        name={name}
        onSubmit={onSubmit}
        autorize={autorize}
        place={place}
      >
        {children}
      </Form>
      <div className="auth-page__container">
        <p className="auth-page__ask">{questionText}</p>
        <Link to={url} className="auth-page__link">
          {linkText}
        </Link>
      </div>
    </section>
  );
}

export default AuthPage;
