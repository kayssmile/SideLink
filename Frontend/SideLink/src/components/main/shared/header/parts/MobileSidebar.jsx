import React from 'react';

import { Box, Button, Stack } from '@mui/material';

import Logo from 'src/components/shared/logo/logo';
import Navigations from './Navigations';

import AccountMenu from 'src/components/main/shared/header/parts/AccountMenu';

const MobileSidebar = () => {
  return (
    <>
      <Box px={3} py={3}>
        <Logo />
      </Box>

      <Box p={3}>
        <Navigations />
      </Box>

      <Box
        p={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AccountMenu />
      </Box>
    </>
  );
};

export default MobileSidebar;
