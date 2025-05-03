import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, Box, Link, IconButton, InputAdornment, CircularProgress, Typography } from '@mui/material';
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
    <>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: '400 !important',
          margin: '4rem 0',
          textAlign: 'center',
          color: 'white',
        }}
      >
        Login
      </Typography>

      <Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: '6rem 10rem',
            paddingTop: '2rem',
            maxWidth: 600,
            mx: 'auto',
            marginBottom: '4rem',
            backgroundColor: theme => theme.palette.background.primary,
          }}
        >
          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: '300',
              margin: '0.5rem 0',
              textAlign: 'left',
              color: 'white',
            }}
          >
            Welcome back to SideLink
          </Typography>

          <StyledTextField label="Email" type="email" name="email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />

          <StyledTextField
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
    </>
  );
}

export default Login;
