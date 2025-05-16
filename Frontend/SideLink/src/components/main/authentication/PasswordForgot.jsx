import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Box, CircularProgress, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { passwordForgotSchema } from 'src/config/Schemas';
import basicPostRequest from 'src/services/BasicRequest';
import { basicErrorMessageLink } from 'src/components/shared/ErrorHandling';

import Logo from 'src/components/shared/logo/Logo';
import { StyledTextField } from 'src/components/shared/forms/FormElements';

function PasswordForgot() {
  const theme = useTheme();
  let [passwordForgot, setPasswordForgot] = useState({ loading: false, error: false, success: false });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordForgotSchema),
  });

  const onSubmit = async data => {
    setPasswordForgot({ ...passwordForgot, loading: true });
    const response = await basicPostRequest('api/auth/password-forgot/', data);
    if (response.status) {
      setPasswordForgot({ loading: false, success: true, error: false });
      reset();
    } else {
      setPasswordForgot({ loading: false, error: response.data, success: false });
    }
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          background: 'radial-gradient(#7c1cf0, #192cd7, #e80707)',
          backgroundSize: '400% 400%',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.9',
        },
      }}
    >
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        <Grid size={{ xs: 12, sm: 12, lg: 4, xl: 6 }} display="flex" justifyContent="center" alignItems="center">
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px', backgroundColor: theme.palette.background.primary }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Logo />
            </Box>
            <Typography color="textMain" textAlign="center" variant="subtitle2" fontWeight="600">
              Bitte geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen. Wir senden Ihnen eine E-Mail mit einem Link zum Zurücksetzen Ihres Passworts.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                //padding: '6rem 10rem',
                marginTop: '2rem',
                width: 'auto',
                //gap: '35px',
                marginBottom: '4rem',
                //backgroundColor: theme.palette.background.primary,
              }}
            >
              <StyledTextField required label="Email" type="email" name="email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
              <input type="hidden" name="honeypot" value="" {...register('honeypot')} />

              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                {passwordForgot.error && basicErrorMessageLink(passwordForgot.error)}

                {passwordForgot.success && (
                  <Typography marginTop={'40px'} color="success">
                    Der Link zum zurücksetzen des Passworts wurde erfolgreich versendet
                  </Typography>
                )}
              </Box>

              <Button variant="contained" disabled={passwordForgot.success} color="primary" type="submit" sx={{ height: '45px', marginTop: '40px', color: 'white', fontSize: '1rem' }}>
                {passwordForgot.loading ? <CircularProgress size="25px" sx={{ color: 'white' }} /> : 'Passwort zurücksetzen'}
              </Button>
              <Button component={Link} to="/login" variant="contained" color="primary" type="submit" sx={{ height: '45px', marginTop: '1rem', color: 'white', fontSize: '1rem' }}>
                Zurück zum Login
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PasswordForgot;
