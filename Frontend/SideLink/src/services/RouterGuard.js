import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function routerGuard() {
  const isLoggedIn = useSelector(state => state.userManagment.userInfo);
  navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/login');
  }

  return isLoggedIn;
}
