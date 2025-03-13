import { Link } from 'react-router-dom';
import logo from 'src/assets/images/logos/logo.svg';

const Logo = () => {
  return (
    <Link to="/home">
      <img src={logo} alt="Logo Sidelink" />
    </Link>
  );
};

export default Logo;
