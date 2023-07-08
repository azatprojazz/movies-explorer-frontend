import { Link } from 'react-router-dom';
import './AccountBtn.css';

function AccountBtn() {
  return (
    <Link className="account-btn" to="/profile">
      Аккаунт
    </Link>
  );
}

export default AccountBtn;
