import './Form.css';

import { LOADING_TEXT } from '../../utils/constants';

function Form({
  name,
  isFormValid,
  handleSubmit,
  errorText,
  isLoading,
  place,
  autorize,
  btnText,
  isProfileEdit = true,
  children,
}) {
  return (
    <form
      name={name}
      onSubmit={handleSubmit}
      className={`form mobile-container-small form_place_${place}`}
    >
      {children}
      <div
        className={`form__container ${
          place !== 'profile' ? `form__container_path_${autorize}` : ''
        }`}
      >
        <span className="form__error">{errorText}</span>
        {isProfileEdit && (
          <button
            className={`form__btn ${place === 'profile' ? 'form__btn_form_profile' : ''} ${
              !isFormValid ? 'form__btn_disabled' : ''
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            {isLoading ? LOADING_TEXT : btnText}
          </button>
        )}
      </div>
    </form>
  );
}

export default Form;
