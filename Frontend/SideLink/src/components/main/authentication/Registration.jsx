import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Box, FormHelperText, IconButton, InputAdornment, CircularProgress, Typography, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import Heading from 'src/components/main/shared/Heading';
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
    <Box component="section" data-testid="registration-form" sx={{ padding: '2rem 0' }}>
      <Heading titleKey1={'Registration.'} subTitle={'Starte deine Suche oder teile dein Können – Registriere dich kostenlos.'} />

      <Grid
        container
        spacing={{ xs: 4, md: 5 }}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          padding: { xs: '2rem 0.3rem', md: '2rem 2rem', lg: '4rem 5rem', xl: '6rem 10rem' },
          marginTop: '2rem',
          marginBottom: '2rem',
          backgroundColor: theme.palette.background.primary,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: '400',
            textAlign: 'left',
            color: theme.palette.text.primary,
            width: '100%',
          }}
        >
          Welcome to SideLink
        </Typography>

        <Grid size={{ xs: 12, md: 6 }}>
          <StyledTextField required label="Vorname" type="text" name="Vorname" {...register('first_name')} error={!!errors.first_name} helperText={errors.first_name?.message} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <StyledTextField required label="Nachname" type="text" name="Nachname" {...register('last_name')} error={!!errors.last_name} helperText={errors.last_name?.message} />
        </Grid>

        <Grid size={12}>
          <StyledTextField required label="Beruf" type="text" name="profession" {...register('profession')} error={!!errors.profession} helperText={errors.profession?.message} />
        </Grid>
        <Grid size={12}>
          <StyledTextField required label="Telefon" type="tel" name="phone_number" {...register('phone_number')} error={!!errors.phone_number} helperText={errors.phone_number?.message} />
        </Grid>
        <Grid size={12}>
          <StyledTextField
            required
            label="Strasse / Hausnummer"
            type="text"
            name="street_address"
            {...register('street_address')}
            error={!!errors.street_address}
            helperText={errors.street_address?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <StyledTextField required label="Postleitzahl" name="postal_code" {...register('postal_code')} error={!!errors.postal_code} helperText={errors.postal_code?.message} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <StyledTextField required label="Ort" type="text" name="place" {...register('place')} error={!!errors.place} helperText={errors.place?.message} />
        </Grid>
        <Grid size={12}>
          <StyledTextField required label="Region" type="text" name="region" {...register('region')} error={!!errors.region} helperText={errors.region?.message} />
        </Grid>
        <Grid size={12}>
          <StyledTextField required label="Email" type="email" name="email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
        </Grid>
        <Grid size={12}>
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
        </Grid>

        <Grid size={12}>
          <RouterLink to="/agb">
            <Typography color="white" sx={{ fontSize: '1.2rem', textDecoration: 'underline' }}>
              Bitte lese die AGBs
            </Typography>
          </RouterLink>
          <StyledFormControlLabel required {...register('agb')} control={<StyledCheckbox />} label="Ich habe die AGBs gelesen und bin damit einverstanden" />
          {errors.agb && <FormHelperText error>{errors.agb?.message}</FormHelperText>}
        </Grid>

        <input type="hidden" name="honeypot" value="" {...register('honeypot')} />

        {error.register && (
          <Typography color="error" sx={{ textAlign: 'center', width: '100%' }}>
            {getRegisterErrorMessage(error.register)}
          </Typography>
        )}

        {success.register && (
          <Typography component={RouterLink} to="/login" color="white" sx={{ textAlign: 'center', mt: '1rem', fontSize: '1.3rem', textDecoration: 'underline', width: '100%' }}>
            Registrierung erfolgreich ! Login
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading.register || success.register}
          sx={{ display: 'block', height: '45px', color: 'white', fontSize: { xs: '1rem', md: '1.1rem' }, width: '250px' }}
        >
          {loading.register ? <CircularProgress size="25px" sx={{ color: 'white' }} /> : 'Registrieren'}
        </Button>
      </Grid>
    </Box>
  );
}

export default Registration;
