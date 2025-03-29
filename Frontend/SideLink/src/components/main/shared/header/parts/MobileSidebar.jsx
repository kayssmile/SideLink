import Logo from 'src/components/shared/logo/logo';
import Navigations from './Navigations';
import AccountMenu from 'src/components/main/shared/header/parts/AccountMenu';

import { Box } from '@mui/material';

const MobileSidebar = () => {
  return (
    <>
      <Box p={3}>
        <Logo />
      </Box>

      <Box p={3}>
        <Navigations />
      </Box>

      <Box
        p={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '100%',
        }}
      >
        <AccountMenu />
      </Box>
    </>
  );
};

export default MobileSidebar;
