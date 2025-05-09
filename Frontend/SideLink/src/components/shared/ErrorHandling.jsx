import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@mui/material';

const getLoginErrorMessage = error => {
  if (error.status === 401 && error.detail === 'user not available') return 'Diese Email ist keinem Benutzer zugewiesen';
  if (error.status === 401) return 'Bitte überprüfe deine Eingaben.';
  return (
    <>
      Technische Störungen, bitte versuche es später nochmals oder{' '}
      <Typography sx={{ color: 'white', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
        <Link component={RouterLink} to="/contact">
          kontaktiere uns
        </Link>
      </Typography>
      {error.detail}
    </>
  );
};

const getRegisterErrorMessage = error => {
  if (error.status === 400 && error.detail === 'A user with this email already exists') return 'Diese Email ist bereits vergeben.';
  if (error.status === 400) return 'Bitte überprüfe deine Eingaben.';
  return (
    <>
      Technische Störungen, bitte versuche es später nochmals oder{' '}
      <Typography sx={{ color: 'white', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
        <Link component={RouterLink} to="/contact">
          kontaktiere uns
        </Link>
      </Typography>
      {error.detail}
    </>
  );
};

const getAccountErrorMessage = error => {
  if (error.status === 400) return <Typography color="error">Bitte überprüfe deine Eingaben.</Typography>;
  return (
    <Typography color="error" sx={{ textAlign: 'center' }}>
      Technische Störungen, bitte versuche es später nochmals oder{' '}
      <Typography sx={{ marginTop: '1rem', color: 'black', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
        <Link component={RouterLink} to="/contact">
          kontaktiere uns
        </Link>
      </Typography>
      {error.detail}
    </Typography>
  );
};

const getChangeEmailErrorMessage = error => {
  if (error.status === 400) return <Typography color="error">Bitte überprüfe deine Eingaben.</Typography>;
  return (
    <Typography color="error" sx={{ textAlign: 'center' }}>
      Technische Störungen, bitte versuche es später nochmals oder{' '}
      <Typography sx={{ marginTop: '1rem', color: 'black', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
        <Link component={RouterLink} to="/contact">
          kontaktiere uns
        </Link>
      </Typography>
      {error.detail}
    </Typography>
  );
};

const getChangePasswordErrorMessage = error => {
  if (error.status === 400) return <Typography color="error">Bitte überprüfe deine Eingaben.</Typography>;
  return (
    <Typography color="error" sx={{ textAlign: 'center' }}>
      Technische Störungen, bitte versuche es später nochmals oder{' '}
      <Typography sx={{ marginTop: '1rem', color: 'black', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
        <Link component={RouterLink} to="/contact">
          kontaktiere uns
        </Link>
      </Typography>
      {error.detail}
    </Typography>
  );
};

const getChangePublicProfileErrorMessage = error => {
  if (error.status === 400) return <Typography color="error">Bitte überprüfe deine Eingaben.</Typography>;
  return (
    <Typography color="error" sx={{ textAlign: 'center' }}>
      Technische Störungen, bitte versuche es später nochmals oder{' '}
      <Typography sx={{ marginTop: '1rem', color: 'black', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
        <Link component={RouterLink} to="/contact">
          kontaktiere uns
        </Link>
      </Typography>
      {error.detail}
    </Typography>
  );
};

const getChangePublicServiceErrorMessage = error => {
  if (error.status === 400) return <Typography color="error">Bitte überprüfe deine Eingaben.</Typography>;
  return (
    <Typography color="error" sx={{ textAlign: 'center' }}>
      Technische Störungen, bitte versuche es später nochmals oder{' '}
      <Typography sx={{ marginTop: '1rem', color: 'white', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
        <Link component={RouterLink} to="/contact">
          kontaktiere uns
        </Link>
      </Typography>
      {error.detail}
    </Typography>
  );
};

const getNewPublicServiceErrorMessage = error => {
  if (error.status === 400) return <Typography color="error">Bitte überprüfe deine Eingaben.</Typography>;
  return (
    <Typography color="error" sx={{ textAlign: 'center' }}>
      Technische Störungen, bitte versuche es später nochmals oder{' '}
      <Typography sx={{ marginTop: '1rem', color: 'black', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
        <Link component={RouterLink} to="/contact">
          kontaktiere uns
        </Link>
      </Typography>
      {error.detail}
    </Typography>
  );
};

const getDeletePublicServiceErrorMessage = error => {
  if (error.status === 400) return <Typography color="error">Bitte überprüfe deine Eingaben.</Typography>;
  return (
    <Typography color="error" sx={{ textAlign: 'center' }}>
      Technische Störungen, bitte versuche es später nochmals oder{' '}
      <Typography sx={{ marginTop: '1rem', color: 'black', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
        <Link component={RouterLink} to="/contact">
          kontaktiere uns
        </Link>
      </Typography>
      {error.detail}
    </Typography>
  );
};

const basicErrorMessage = error => {
  if (error.status === 400)
    return (
      <Typography color="error" marginTop={'40px'}>
        Bitte überprüfe deine Eingaben.
      </Typography>
    );
  return (
    <Typography color="error" sx={{ textAlign: 'center', marginTop: '40px' }}>
      Technische Störungen, bitte versuche es später nochmals.
      {error.detail}
    </Typography>
  );
};

export {
  getLoginErrorMessage,
  getRegisterErrorMessage,
  getAccountErrorMessage,
  getChangeEmailErrorMessage,
  getChangePasswordErrorMessage,
  getChangePublicProfileErrorMessage,
  getChangePublicServiceErrorMessage,
  getNewPublicServiceErrorMessage,
  getDeletePublicServiceErrorMessage,
  basicErrorMessage,
};
