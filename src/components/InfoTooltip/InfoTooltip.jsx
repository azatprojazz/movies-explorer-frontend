import './InfoTooltip.css';

import Overlay from '../Overlay/Overlay';

// Компонент всплывающего окна с информационным сообщением и иконкой успеха/неудачи
function InfoTooltip({ isOpen, onClose, isSuccess = false, message }) {
  // Рендер компонента InfoTooltip
  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className="popup__container popup__container-info">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h3 className={`popup__title popup__title_type_${isSuccess ? 'success' : 'error'}`}>
          {message}
        </h3>
      </div>
    </Overlay>
  );
}

export default InfoTooltip;
