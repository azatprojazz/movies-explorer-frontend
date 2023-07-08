import { useState } from 'react';
import './Form.css';

function Form({ name, onSubmit, place, autorize, btnText, isProfileEdit = true, children }) {
  const [isSuccess] = useState(true);
  // Для того чтобы проверить наличие компонента, задайте стейту isSuccess значение false

  const [isFormValid] = useState(true);
  // Для того чтобы задизейблить кнопку, надо переключить isFormValid на false
  return (
    <form name={name} onSubmit={onSubmit} className={`form form_place_${place}`}>
      {children}
      <div
        className={`form__container ${
          place !== 'profile' ? `form__container_path_${autorize}` : ''
        }`}
      >
        <span className="form__server-errors">
          {isSuccess ? '' : 'При обновлении профиля произошла ошибка.'}
        </span>
        {isProfileEdit && (
          <button
            className={`form__btn ${place === 'profile' ? 'form__btn_form_profile' : ''} ${
              !isFormValid ? 'form__btn_disabled' : ''
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            {btnText}
          </button>
        )}
      </div>
    </form>
  );
}

export default Form;
