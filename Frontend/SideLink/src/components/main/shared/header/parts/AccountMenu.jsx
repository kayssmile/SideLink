import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile from 'src/components/shared/header/Profile';

const AccountMenu = () => {
  const isLoggedIn = useSelector(state => state.account.isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <Profile />
      ) : (
        <Button color="primary" variant="contained" component={Link} to="/login">
          Log In
        </Button>
      )}
    </>
  );
};

export default AccountMenu;
