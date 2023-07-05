import './Overlay.css';

function Overlay({ isOpen, children }) {
  return <div className={`overlay ${isOpen ? 'overlay_is_opened' : ''}`}>{children}</div>;
}

export default Overlay;
