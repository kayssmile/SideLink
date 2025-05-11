import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Box, IconButton, InputAdornment, FormGroup, CircularProgress, Typography, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import registerUser from 'src/store/usermanagment/actions/RegisterAction';
import { registerSchema } from 'src/config/Schemas';
import { getRegisterErrorMessage } from 'src/components/shared/ErrorHandling';

import { StyledTextField, StyledFormControlLabel, StyledCheckbox } from 'src/components/shared/forms/FormElements';

function Registration() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.userManagment);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = data => {
    dispatch(registerUser(data));
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
        Registration.{' '}
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
        Starte deine Suche oder teile dein Können – Registriere dich kostenlos.
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '6rem 10rem',
          paddingTop: '2rem',
          marginTop: '2rem',
          width: 'auto',
          gap: '35px',
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
            width: '100%',
          }}
        >
          Welcome to SideLink
        </Typography>

        <FormGroup sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <StyledTextField required label="Vorname" type="text" name="Vorname" {...register('first_name')} error={!!errors.first_name} helperText={errors.first_name?.message} sx={{ width: '48%' }} />
          <StyledTextField required label="Nachname" type="text" name="Nachname" {...register('last_name')} error={!!errors.last_name} helperText={errors.last_name?.message} sx={{ width: '48%' }} />
        </FormGroup>

        <StyledTextField required label="Beruf" type="text" name="profession" {...register('profession')} error={!!errors.profession} helperText={errors.profession?.message} />
        <StyledTextField required label="Telefon" type="tel" name="phone_number" {...register('phone_number')} error={!!errors.phone_number} helperText={errors.phone_number?.message} />
        <StyledTextField
          required
          label="Strasse / Hausnummer"
          type="text"
          name="street_address"
          {...register('street_address')}
          error={!!errors.street_address}
          helperText={errors.street_address?.message}
        />

        <FormGroup sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <StyledTextField required label="Postleitzahl" name="postal_code" {...register('postal_code')} error={!!errors.postal_code} helperText={errors.postal_code?.message} sx={{ width: '30%' }} />
          <StyledTextField required label="Ort" type="text" name="place" {...register('place')} error={!!errors.place} helperText={errors.place?.message} sx={{ width: '30%' }} />
          <StyledTextField required label="Region" type="text" name="region" {...register('region')} error={!!errors.region} helperText={errors.region?.message} sx={{ width: '30%' }} />
        </FormGroup>

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

        <Box>
          <RouterLink to="/agb">
            <Typography color="white" sx={{ fontSize: 20, textDecoration: 'underline' }}>
              Bitte lese die AGBs
            </Typography>
          </RouterLink>

          <StyledFormControlLabel required control={<StyledCheckbox />} label="Ich habe die AGBs gelesen und bin damit einverstanden" />
        </Box>
        <input type="hidden" name="honeypot" value="" {...register('honeypot')} />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading.register || success.register}
          sx={{ height: '45px', marginTop: '40px', color: 'white', fontSize: '1rem', width: '250px', left: 'calc(100% - 250px)' }}
        >
          {loading.register ? <CircularProgress size="25px" sx={{ color: 'white' }} /> : 'Registrieren'}
        </Button>

        {error.register && (
          <Typography color="error" sx={{ textAlign: 'center', mb: '1rem' }}>
            {getRegisterErrorMessage(error.register)}
          </Typography>
        )}

        {success.register && (
          <RouterLink to="/login">
            <Typography color="white" sx={{ textAlign: 'center', mt: '2rem', fontSize: '20px', textDecoration: 'underline' }}>
              Registrierung erfolgreich ! Login
            </Typography>
          </RouterLink>
        )}
      </Box>
    </Box>
  );
}

export default Registration;
