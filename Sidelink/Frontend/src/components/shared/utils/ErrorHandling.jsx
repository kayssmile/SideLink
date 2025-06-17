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
  if (error.status === 400 && error.detail === 'Actual password is wrong') {
    return (
      <Typography color="error" sx={{ textAlign: 'center', mb: '1rem', display: 'block', width: '100%' }}>
        Das eingegebene Passwort ist falsch.
        <br />
      </Typography>
    );
  }
  if (error.status === 400) {
    return (
      <Typography color="error" sx={{ textAlign: 'center', mb: '1rem', width: '100%' }}>
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

const basicErrorMessageLink = error => {
  return (
    <Typography color="error" sx={{ textAlign: 'center', margin: '1rem 0' }}>
      Technische Störungen, bitte versuche es später nochmals oder{' '}
      <Typography component="span" sx={{ margin: '1rem 0', color: 'white', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
        <br />
        <Link component={RouterLink} to="/contact">
          kontaktiere uns
        </Link>
        <br />
      </Typography>
      {error.detail}
    </Typography>
  );
};

export { basicFormErrorMessage, basicErrorMessage, basicErrorMessageLink };
