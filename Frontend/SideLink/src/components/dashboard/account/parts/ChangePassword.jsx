import { useEffect, useState } from 'react';
import { CardContent, Typography, CircularProgress, Box, Button, InputAdornment, IconButton, useMediaQuery } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { changePasswordSchema } from 'src/config/Schemas';
import patchAccountPassword from 'src/store/dashboard/main/actions/PatchAccountPasswordAction';
import { checkAuth } from 'src/services/AuthService';
import { resetProcess } from 'src/store/dashboard/main/DashboardManagment';
import { getChangePasswordErrorMessage } from 'src/components/shared/ErrorHandling';

import Modal from 'src/components/shared/Modal';
import StyledCard from 'src/components/dashboard/shared/StyledCard';
import { StyledTextField, StyledFormLabel } from 'src/components/shared/forms/FormElements';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { changePassword } = useSelector(state => state.dashboard);
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const handleConfirmModalAgree = () => {
    setConfirmModal(false);
    dispatch(resetProcess('changePassword'));
  };

  const onSubmit = async data => {
    try {
      if (await checkAuth()) {
        dispatch(patchAccountPassword(data));
      }
    } catch (error) {
      console.error(error);
    }
    reset();
  };

  useEffect(() => {
    if (changePassword.error || changePassword.success) {
      setConfirmModal(true);
    }
  }, [changePassword.error, changePassword.success]);

  return (
    <Grid size={{ xs: 12, xl: 6 }}>
      <StyledCard component="form" onSubmit={handleSubmit(onSubmit)} variant={'outlined'} sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h5" mb={1}>
            Password
          </Typography>
          <Typography color="textSecondary" mb={3}>
            Ändere dein Passwort hier
          </Typography>
          <Box>
            <StyledFormLabel
              sx={{
                mt: 0,
              }}
              htmlFor="current_password"
            >
              Current Password
            </StyledFormLabel>
            <StyledTextField
              id="current_password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              {...register('current_password')}
              error={!!errors.current_password}
              helperText={errors.current_password?.message}
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

            <StyledFormLabel htmlFor="new_password">New Password</StyledFormLabel>
            <StyledTextField
              id="new_password"
              variant="outlined"
              type={showNewPassword ? 'text' : 'password'}
              {...register('new_password')}
              error={!!errors.new_password}
              helperText={errors.new_password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end" sx={{ color: 'white' }}>
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <StyledFormLabel htmlFor="confirm_password">Confirm Password</StyledFormLabel>
            <StyledTextField
              id="confirm_password"
              variant="outlined"
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
          </Box>
        </CardContent>

        <Box mt={6} sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={changePassword.loading}
            sx={{
              height: '45px',
              marginTop: smDown ? '0' : '40px',
              color: 'white',
              fontSize: '1rem',
              width: smDown ? '100%' : '250px',
              marginRight: '1rem',
              marginBottom: '1rem',
              marginLeft: smDown ? '1rem' : 'auto',
            }}
          >
            {changePassword.loading ? <CircularProgress size="25px" sx={{ color: 'white' }} /> : 'Speichern'}
          </Button>
        </Box>

        {confirmModal && (
          <Modal
            modalState={confirmModal}
            handleCancel={handleConfirmModalAgree}
            modalTitle="Bestätigung erforderlich"
            modalContent={
              changePassword.error ? getChangePasswordErrorMessage(changePassword.error) : changePassword.success ? <Typography color="success">Passwort erfolgreich aktualisiert!</Typography> : ''
            }
            handleAgree={handleConfirmModalAgree}
            usage="single-btn"
          />
        )}
      </StyledCard>
    </Grid>
  );
};

export default ChangePassword;
