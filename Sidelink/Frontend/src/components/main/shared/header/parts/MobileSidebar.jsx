import { Box, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { IconX } from '@tabler/icons-react';

import { toggleMobileSidebar } from 'src/store/publicdata/PublicDataManagment';

import Logo from 'src/components/shared/logo/Logo';
import Navigations from './Navigations';
import AccountMenu from 'src/components/main/shared/header/parts/AccountMenu';

const MobileSidebar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Box p={3} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Logo />
        <IconButton sx={{ color: theme => theme.palette.colors.white, marginTop: '-45px', marginRight: '-10px' }} onClick={() => dispatch(toggleMobileSidebar())}>
          <IconX size="30" />
        </IconButton>
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
