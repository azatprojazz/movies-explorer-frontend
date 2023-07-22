import './Overlay.css';

import { useEffect } from 'react';

function Overlay({ isOpen, onClose, children }) {
  const handleClickByOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    isOpen && document.addEventListener('keydown', handleKeyEsc);
    return () => {
      document.removeEventListener('keydown', handleKeyEsc);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`overlay ${isOpen ? 'overlay_is_opened' : ''}`} onClick={handleClickByOverlay}>
      {children}
    </div>
  );
}

export default Overlay;
