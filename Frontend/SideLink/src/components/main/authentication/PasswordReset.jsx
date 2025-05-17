import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Box, IconButton, InputAdornment, CircularProgress, Typography, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { passwordResetSchema } from 'src/config/Schemas';
import basicPostRequest from 'src/services/BasicRequest';
import { basicErrorMessageLink } from 'src/components/shared/ErrorHandling';

import Logo from 'src/components/shared/logo/logo';
import { StyledTextField } from 'src/components/shared/forms/formelements';

function PasswordReset() {
  const theme = useTheme();
  const { uid, token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordReset, setPasswordReset] = useState({ loading: false, error: false, success: false });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordResetSchema),
  });

  const onSubmit = async data => {
    if (!uid || !token) return;
    setPasswordReset(prev => ({ ...prev, loading: true }));
    try {
      const payload = { ...data, uidb64: uid, token };
      const response = await basicPostRequest('api/auth/password-reset/', payload);
      if (response.status) {
        setPasswordReset({ loading: false, success: true, error: false });
        reset();
      } else {
        setPasswordReset({ loading: false, error: response.data, success: false });
      }
    } catch (error) {
      console.error('Request failed:', error);
      setPasswordReset({ loading: false, error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.', success: false });
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
              Bitte geben Sie Ihr neues Passwort ein.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '2rem',
                width: 'auto',
                marginBottom: '4rem',
              }}
            >
              <StyledTextField
                id="password"
                variant="outlined"
                label="Neues Passwort"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ marginBottom: '1rem' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'white' }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                id="confirm_password"
                variant="outlined"
                label="Passwort bestätigen"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirm_password')}
                error={!!errors.confirm_password}
                helperText={errors.confirm_password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" sx={{ color: 'white' }}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <input type="hidden" name="honeypot" value="" {...register('honeypot')} />

              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                {passwordReset.error && basicErrorMessageLink(passwordReset.error)}
                {passwordReset.success && (
                  <Typography marginTop={'40px'} color="success">
                    Passwort wurde erfolgreich geändert
                  </Typography>
                )}
              </Box>

              <Button
                disabled={passwordReset.success}
                variant="contained"
                color="primary"
                type="submit"
                sx={{ height: '45px', marginTop: '40px', color: 'white', fontSize: { xs: '0.8rem', sm: '1.1rem' } }}
              >
                {passwordReset.loading ? <CircularProgress size="25px" sx={{ color: 'white' }} /> : 'Passwort zurücksetzen'}
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                type="button"
                sx={{ height: '45px', marginTop: '1rem', color: 'white', fontSize: { xs: '0.8rem', sm: '1.1rem' } }}
              >
                Zum Login
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PasswordReset;
