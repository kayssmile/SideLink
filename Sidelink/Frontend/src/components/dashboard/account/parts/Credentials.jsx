import { useMediaQuery } from '@mui/material';

import Grid from '@mui/material/Grid2';

import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

const Credentials = () => {
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <>
      <Grid container spacing={smDown ? 1 : 2}>
        <ChangeEmail />
        <ChangePassword />
      </Grid>
    </>
  );
};

export default Credentials;
