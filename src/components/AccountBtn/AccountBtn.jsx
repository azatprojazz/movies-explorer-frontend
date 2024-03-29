import './AccountBtn.css';

import { Link } from 'react-router-dom';

function AccountBtn({ onClose }) {
  return (
    <Link className="account-btn" to="/profile" onClick={onClose ?? undefined}>
      Аккаунт
    </Link>
  );
}

export default AccountBtn;
