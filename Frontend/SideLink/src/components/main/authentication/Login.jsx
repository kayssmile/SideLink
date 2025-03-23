import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { StyledTextField } from 'src/components/shared/forms/formelements';
import userLogin from 'src/store/usermanagment/services/LoginAction';

import Typography from '@mui/material/Typography';
import { Button, Box, Link, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = yup.object().shape({
  email: yup.string().matches(emailRegex, 'Ungültige E-Mail').email('Ungültige E-Mail').required('E-Mail ist erforderlich'),
  password: yup
    .string()
    .min(3, 'Mindestens 6 Zeichen')
    //.matches(/[A-Z]/, 'Mindestens ein Großbuchstabe erforderlich')
    //.matches(/[@$!%*?&]/, 'Mindestens ein Sonderzeichen erforderlich (@, $, !, %, *, ?, &)')
    .required('Passwort ist erforderlich'),
});

function Login() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, userInfo, error } = useSelector(state => state.accountManagment);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.email) {
      //navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    dispatch(userLogin(data));
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

      <Box sx={{}}>
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
            backgroundColor: theme.palette.background.primary,
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
            disabled={loading}
          >
            {loading ? <CircularProgress size="25px" /> : 'Login'}
          </Button>

          {error && (
            <Typography color="error" sx={{ textAlign: 'center', mb: '1rem' }}>
              {error.status === 401 && error.detail === 'user not available' ? (
                'Diese Email ist keinem Benutzer zugewiesen'
              ) : error.status === 401 ? (
                'Bitte überprüfe deine Eingaben.'
              ) : (
                <>
                  Technische Störungen, bitte versuche es später nochmals oder{' '}
                  <Typography sx={{ color: 'white', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
                    <Link component={RouterLink} to="/contact">
                      kontaktiere uns
                    </Link>
                  </Typography>
                  {error.detail}
                </>
              )}
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
