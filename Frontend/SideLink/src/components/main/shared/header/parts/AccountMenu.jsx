import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileMenuDesktop from 'src/components/shared/header/ProfileMenuDesktop';
import ProfileMenuMobile from 'src/components/shared/header/ProfileMenuMobile';

const AccountMenu = ({ mdUp = false }) => {
  const isLoggedIn = useSelector(state => state.userManagment.userInfo);

  return (
    <>
      {isLoggedIn && mdUp ? (
        <ProfileMenuDesktop />
      ) : isLoggedIn && !mdUp ? (
        <ProfileMenuMobile />
      ) : (
        <Button color="primary" variant="contained" component={Link} to="/login">
          Log In
        </Button>
      )}
    </>
  );
};

export default AccountMenu;
