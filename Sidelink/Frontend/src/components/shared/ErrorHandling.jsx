import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@mui/material';

const basicFormErrorMessage = error => {
  if (error.status === 400 && error.detail === 'A user with this email already exists') {
    return (
      <Typography color="error" sx={{ textAlign: 'center', mb: '1rem', display: 'block', width: '100%' }}>
        Diese Email ist bereits vergeben.
        <br />
      </Typography>
    );
  }
  if (error.status === 400) {
    return (
      <Typography color="error" sx={{ textAlign: 'center', mb: '1rem' }}>
        Bitte überprüfe deine Eingaben.
      </Typography>
    );
  }
  return (
    <Typography color="error" sx={{ textAlign: 'center', mb: '1rem' }}>
      Technische Störungen, bitte versuche es später nochmals oder{' '}
      <Typography
        component="span"
        sx={{
          color: 'white',
          textDecoration: 'underline',
          a: { color: 'inherit' },
        }}
      >
        <br />
        <Link component={RouterLink} to="/contact">
          kontaktiere uns
        </Link>
      </Typography>
      <br />
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
      <br />
      {error.detail}
    </Typography>
  );
};

const errorMessage = error => {
  return (
    <Typography color="error" sx={{ textAlign: 'center', marginTop: '40px' }}>
      Technische Störungen, bitte versuche es später nochmals.
      {error.detail}
    </Typography>
  );
};

const basicErrorMessageLink = error => {
  return (
    <Typography color="error" sx={{ textAlign: 'center', margin: '1rem 0' }}>
      Technische Störungen, bitte versuche es später nochmals oder{' '}
      <Typography sx={{ margin: '1rem 0', color: 'white', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
        <Link component={RouterLink} to="/contact">
          kontaktiere uns
        </Link>
      </Typography>
      {error.detail}
    </Typography>
  );
};

export {
  basicFormErrorMessage,
  getChangeEmailErrorMessage,
  getChangePasswordErrorMessage,
  getChangePublicProfileErrorMessage,
  getChangePublicServiceErrorMessage,
  getNewPublicServiceErrorMessage,
  getDeletePublicServiceErrorMessage,
  basicErrorMessage,
  errorMessage,
  basicErrorMessageLink,
};
