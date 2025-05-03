import { useEffect, useState } from 'react';
import { CardContent, Typography, Box, Button, CircularProgress, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { changeEmailSchema } from 'src/config/Schemas';
import { checkAuth } from 'src/services/AuthService';
import patchAccountEmail from 'src/store/dashboard/main/actions/PatchAccountEmailAction';
import { resetProcess } from 'src/store/dashboard/main/DashboardManagment';
import { getChangeEmailErrorMessage } from 'src/components/shared/ErrorHandling';

import Modal from 'src/components/dashboard/shared/Modal';
import StyledCard from 'src/components/dashboard/shared/StyledCard';
import { StyledTextField, StyledFormLabel } from 'src/components/shared/forms/FormElements';

const ChangeEmail = () => {
  const dispatch = useDispatch();
  const { dashboardData, changeEmail } = useSelector(state => state.dashboard);
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changeEmailSchema),
    context: {
      userEmail: dashboardData.user.email,
    },
  });

  const [confirmModal, setConfirmModal] = useState(false);

  const handleConfirmModalAgree = () => {
    setConfirmModal(false);
    dispatch(resetProcess('changeEmail'));
  };

  const onSubmit = async data => {
    try {
      if (await checkAuth()) {
        data = { email: data.email_new };
        dispatch(patchAccountEmail(data));
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (changeEmail.error || changeEmail.success) {
      setConfirmModal(true);
    }
  }, [changeEmail.error, changeEmail.success]);

  return (
    <Grid size={{ xs: 12, xl: 6 }}>
      <StyledCard component="form" onSubmit={handleSubmit(onSubmit)} variant={'outlined'} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CardContent>
          <Typography variant="h5" mb={1}>
            Email
          </Typography>
          <Typography color="textSecondary" mb={3}>
            Ändere deine E-Mail-Adresse hier
          </Typography>
          <Box>
            <StyledFormLabel
              sx={{
                mt: 0,
              }}
              htmlFor="email"
            >
              Aktuelle Email
            </StyledFormLabel>

            <StyledTextField id="email" type="email" name="email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />

            <StyledFormLabel htmlFor="new_email">Neue Email</StyledFormLabel>
            <StyledTextField id="new_email" type="email" name="email_new" {...register('email_new')} error={!!errors.email_new} helperText={errors.email_new?.message} />
          </Box>
        </CardContent>

        <Box mt={6} sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={changeEmail.loading}
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
            {changeEmail.success ? <CircularProgress size="25px" sx={{ color: 'white' }} /> : 'Speichern'}
          </Button>
        </Box>
        {confirmModal && (
          <Modal
            modalState={confirmModal}
            handleCancel={handleConfirmModalAgree}
            modalTitle="Bestätigung erforderlich"
            modalContent={changeEmail.error ? getChangeEmailErrorMessage(changeEmail.error) : changeEmail.success ? <Typography color="success">Email erfolgreich aktualisiert!</Typography> : ''}
            handleAgree={handleConfirmModalAgree}
            usage="single-btn"
          />
        )}
      </StyledCard>
    </Grid>
  );
};

export default ChangeEmail;
