import { Button, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileMenu from 'src/components/shared/header/ProfileMenu';
import ProfileMenuMobile from 'src/components/shared/header/ProfileMenuMobile';

const AccountMenu = () => {
  const { dashboardData } = useSelector(state => state.dashboard);
  const isLoggedIn = dashboardData.user.email;
  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'));

  return (
    <>
      {isLoggedIn && mdUp ? (
        <ProfileMenu />
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
