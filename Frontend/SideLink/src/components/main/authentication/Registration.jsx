import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import registerUser from 'src/store/usermanagment/services/registerAction';
import { StyledTextField, StyledFormControlLabel, StyledCheckbox } from 'src/components/shared/forms/formelements';

import Typography from '@mui/material/Typography';
import { Button, Box, IconButton, InputAdornment, Stack, FormGroup, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = yup.object().shape({
  first_name: yup
    .string()
    .required('Vorname ist erforderlich')
    .matches(/^[A-Za-z\s]+$/, 'Nur Buchstaben sind erlaubt'),
  last_name: yup
    .string()
    .required('Nachname ist erforderlich')
    .matches(/^[A-Za-z\s]+$/, 'Nur Buchstaben sind erlaubt'),
  profession: yup.string().required('Beruf ist erforderlich'),
  phone_number: yup
    .string()
    .required('Telefonnummer ist erforderlich')
    .matches(/^\+?[0-9]{7,15}$/, 'Ungültige Telefonnummer'),
  street_address: yup.string().required('Strasse ist erforderlich'),
  postal_code: yup.number().required('Postleitzahl ist erforderlich'),
  place: yup.string().required('Ort ist erforderlich'),
  region: yup.string().required('Region ist erforderlich'),
  email: yup.string().matches(emailRegex, 'Ungültige E-Mail').email('Ungültige E-Mail').required('E-Mail ist erforderlich'),
  password: yup
    .string()
    .min(6, 'Mindestens 6 Zeichen')
    .matches(/[A-Z]/, 'Mindestens ein Großbuchstabe erforderlich')
    .matches(/[@$!%*?&]/, 'Mindestens ein Sonderzeichen erforderlich (@, $, !, %, *, ?, &)')
    .required('Passwort ist erforderlich'),
});

function Registration() {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.userManagment);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleReset = () => {
    setValue('profile_picture', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = data => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key !== 'profile_picture') {
        formData.append(key, data[key]);
      }
    });
    if (data.profile_picture != null && data.profile_picture[0]) {
      formData.append('profile_picture', data.profile_picture[0]);
    }
    dispatch(registerUser(formData));
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
        Registration
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '6rem 10rem',
          paddingTop: '2rem',
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
          <StyledTextField
            required
            label="Postleitzahl"
            type="number"
            name="postal_code"
            {...register('postal_code')}
            error={!!errors.postal_code}
            helperText={errors.postal_code?.message}
            sx={{ width: '30%' }}
          />
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

        <Box mt={2}>
          <Typography component="label" htmlFor="profile_picture" sx={{ color: 'white', fontSize: 20, display: 'block', mb: 1 }}>
            Profilbild
          </Typography>

          <Stack direction="row" spacing={2} mb={3}>
            <Button variant="contained" component="label" color="primary" sx={{}}>
              <input ref={fileInputRef} accept="image/*" name="profile_picture" type="file" multiple={false} style={{ maxWidth: '100%' }} {...register('profile_picture')} />
            </Button>
            <Button variant="outlined" color="error" onClick={handleReset} sx={{ px: 3, fontSize: '1rem' }}>
              Reset
            </Button>
          </Stack>
          {/* {errors.profile_picture && (
            <Typography color="error" sx={{ mt: '-10px' }}>
              {errors.profile_picture.message}
            </Typography>
          )}
          
            <Typography color="white" sx={{ mb: 2, fontSize: 14, opacity: 0.8 }}>
              JPG, GIF oder PNG erlaubt.
            </Typography> */}
        </Box>

        <Box>
          <RouterLink to="/agb">
            <Typography color="white" sx={{ fontSize: 20, textDecoration: 'underline' }}>
              Bitte lese die AGBs
            </Typography>
          </RouterLink>

          <StyledFormControlLabel required control={<StyledCheckbox />} label="Ich habe die AGBs gelesen und bin damit einverstanden" />
        </Box>

        <Button variant="contained" color="primary" type="submit" disabled={loading} sx={{ height: '45px', marginTop: '40px', color: 'white', fontSize: '1rem' }}>
          {loading ? <CircularProgress size="25px" /> : 'Registrieren'}
        </Button>

        {error && (
          <Typography color="error" sx={{ textAlign: 'center', mb: '1rem' }}>
            {error.status === 400 && error.detail === 'A user with this email already exists' ? (
              'Diese Email ist bereits vergeben.'
            ) : error.status === 400 ? (
              'Bitte überprüfe deine Eingaben.'
            ) : (
              <>
                Technische Störungen, bitte versuche es später nochmals oder{' '}
                <Typography sx={{ color: 'white', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' } }}>
                  <RouterLink to="/contact">kontaktiere uns</RouterLink>
                </Typography>
                {error.detail}
              </>
            )}
          </Typography>
        )}

        {success && (
          <RouterLink to="/login">
            <Typography color="white" sx={{ textAlign: 'center', mt: '2rem', fontSize: '20px', textDecoration: 'underline' }}>
              Registrierung erfolgreich ! Login
            </Typography>
          </RouterLink>
        )}
      </Box>
    </>
  );
}

export default Registration;
