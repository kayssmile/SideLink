import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, Box, Link, IconButton, InputAdornment, CircularProgress, Typography, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import login from 'src/store/usermanagment/actions/LoginAction';
import getDashboardData from 'src/store/dashboard/shared/actions/GetDashboardDataAction';
import { loginSchema } from 'src/config/Schemas';
import { getLoginErrorMessage } from 'src/components/shared/ErrorHandling';
import { getToken } from 'src/services/AuthService';

import { StyledTextField } from 'src/components/shared/forms/formelements';

function Login() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, success, error } = useSelector(state => state.userManagment);
  const { dashboardData } = useSelector(state => state.dashboard);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success.login) {
      const token = getToken();
      if (token) {
        dispatch(getDashboardData(token));
      }
    }
  }, [success.login, dispatch]);

  useEffect(() => {
    if (dashboardData.success) {
      navigate('/dashboard');
    }
  }, [dashboardData.success, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = data => {
    dispatch(login(data));
  };

  return (
    <Box component="section" data-testid="" sx={{ padding: '2rem 0' }}>
      <Typography
        variant="h1"
        fontWeight={700}
        lineHeight="1.2"
        color={theme.palette.text.primary}
        sx={{
          fontSize: {
            xs: '40px',
            sm: '56px',
          },
        }}
      >
        Login.{' '}
      </Typography>

      <Typography
        variant="body1"
        color={theme.palette.text.primary}
        sx={{
          fontSize: {
            xs: '22px',
            sm: '24px',
            opacity: '0.7',
          },
        }}
        fontWeight={700}
      >
        Weiter gehts, schön dass du wieder da bist.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: '6rem 10rem',
          marginTop: '2rem',
          mx: 'auto',
          marginBottom: '4rem',
          backgroundColor: theme.palette.background.primary,
        }}
      >
        <StyledTextField required label="Email" type="email" name="email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />

        <StyledTextField
          required
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
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
        <input type="hidden" name="honeypot" value="" {...register('honeypot')} />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ height: '45px', fontSize: '1rem', margin: '1rem 0', padding: '10px 0', color: 'white', '&.Mui-disabled': { backgroundColor: 'primary' } }}
          disabled={loading.login}
        >
          {loading.login ? <CircularProgress size="25px" /> : 'Login'}
        </Button>

        {error.login && (
          <Typography color="error" sx={{ textAlign: 'center', mb: '1rem' }}>
            {getLoginErrorMessage(error.login)}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, color: 'white' }}>
          <Link component={RouterLink} to="/password-forgot" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Passwort vergessen?
          </Link>
          <Link component={RouterLink} to="/registration" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Neu hier? Registriere dich hier
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
