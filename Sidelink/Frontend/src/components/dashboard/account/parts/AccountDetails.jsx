import { useEffect, useState } from 'react';
import { CardContent, Typography, Box, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { editAccountSchema } from 'src/config/Schemas';
import { checkAuth } from 'src/services/AuthService';
import patchAccountDetails from 'src/store/dashboard/main/actions/PatchAccountDataAction';
import { resetProcess } from 'src/store/dashboard/main/DashboardManagment';
import { basicFormErrorMessage } from 'src/components/shared/ErrorHandling';
import { toggleInfoModal } from 'src/store/usermanagment/UserManagment';

import Modal from 'src/components/shared/Modal';
import StyledCard from 'src/components/dashboard/shared/StyledCard';
import { StyledTextField, StyledFormLabel } from 'src/components/shared/forms/FormElements';

const AccountDetails = () => {
  const dispatch = useDispatch();
  const { dashboardData, accountDetails } = useSelector(state => state.dashboard);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editAccountSchema),
  });

  const [confirmModal, setConfirmModal] = useState(false);

  const handleConfirmModalAgree = () => {
    setConfirmModal(false);
    dispatch(resetProcess('accountDetails'));
  };

  const onSubmit = async data => {
    try {
      if (await checkAuth()) {
        dispatch(patchAccountDetails(data));
      } else {
        dispatch(toggleInfoModal());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (accountDetails.error || accountDetails.success) {
      setConfirmModal(true);
    }
  }, [accountDetails.error, accountDetails.success]);

  useEffect(() => {
    if (dashboardData.user) {
      const user = dashboardData.user;
      setValue('first_name', user.first_name);
      setValue('last_name', user.last_name);
      setValue('profession', user.profession);
      setValue('last_name', user.last_name);
      setValue('phone_number', user.phone_number);
      setValue('street_address', user.street_address);
      setValue('postal_code', user.postal_code);
      setValue('place', user.place);
      setValue('region', user.region);
    }
  }, [dashboardData, setValue]);

  return (
    <Grid container>
      <Grid size={12}>
        <StyledCard variant={'outlined'} sx={{ height: '100%', border: 'none', boxShadow: 'none' }}>
          <CardContent component="form" onSubmit={handleSubmit(onSubmit)} sx={{ padding: { xs: '5px', sm: '16px' }, paddingTop: { xs: '20px' } }}>
            <Typography variant="h5" mb={1}>
              Account
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Ändere deine Accountdaten hier
            </Typography>

            <Box>
              <Grid container spacing={{ xs: 1, sm: 2 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <StyledFormLabel htmlFor="first_name" sx={{ mt: 0 }}>
                    Vorname
                  </StyledFormLabel>
                  <StyledTextField
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="kay the DDev"
                    {...register('first_name')}
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <StyledFormLabel htmlFor="last_name" sx={{ mt: { xs: 1, sm: 0 } }}>
                    Nachname
                  </StyledFormLabel>
                  <StyledTextField type="text" name="last_name" id="last_name" {...register('last_name')} error={!!errors.last_name} helperText={errors.last_name?.message} />
                </Grid>

                <Grid size={12}>
                  <StyledFormLabel htmlFor="profession">Beruf</StyledFormLabel>
                  <StyledTextField type="text" name="profession" id="profession" {...register('profession')} error={!!errors.profession} helperText={errors.profession?.message} />
                </Grid>
                <Grid size={12}>
                  <StyledFormLabel htmlFor="phone_number">Telefon</StyledFormLabel>
                  <StyledTextField type="tel" name="phone_number" id="phone_number" {...register('phone_number')} error={!!errors.phone_number} helperText={errors.phone_number?.message} />
                </Grid>
                <Grid size={12}>
                  <StyledFormLabel htmlFor="street_address">Strasse & Hausnummer</StyledFormLabel>
                  <StyledTextField type="text" name="street_address" id="street_address" {...register('street_address')} error={!!errors.street_address} helperText={errors.street_address?.message} />
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <StyledFormLabel htmlFor="postal_code">PLZ</StyledFormLabel>
                  <StyledTextField name="postal_code" id="postal_code" {...register('postal_code')} error={!!errors.postal_code} helperText={errors.postal_code?.message} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <StyledFormLabel htmlFor="place">Ort</StyledFormLabel>
                  <StyledTextField id="place" type="text" name="place" {...register('place')} error={!!errors.place} helperText={errors.place?.message} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <StyledFormLabel htmlFor="region">Region</StyledFormLabel>
                  <StyledTextField id="region" type="text" name="region" {...register('region')} error={!!errors.region} helperText={errors.region?.message} />
                </Grid>
              </Grid>
            </Box>

            <Box mt={6} sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={accountDetails.loading}
                sx={{ height: '45px', marginTop: '2rem', color: 'white', fontSize: '1rem', width: { xs: '100%', sm: '250px' } }}
              >
                {accountDetails.loading ? <CircularProgress size="25px" sx={{ color: 'white' }} /> : 'Speichern'}
              </Button>
            </Box>
            {confirmModal && (
              <Modal
                modalState={confirmModal}
                handleCancel={handleConfirmModalAgree}
                modalTitle="Bestätigung erforderlich"
                modalContent={
                  accountDetails.error ? basicFormErrorMessage(accountDetails.error) : accountDetails.success ? <Typography color="success">Account erfolgreich aktualisiert!</Typography> : ''
                }
                handleAgree={handleConfirmModalAgree}
                usage="single-btn"
              />
            )}
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default AccountDetails;
