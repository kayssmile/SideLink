import { useEffect, useState } from 'react';
import { CardContent, Typography, Box, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { publicServiceSchema } from 'src/config/Schemas';
import regionsConfiguration from 'src/config/LocationConfigurations';
import { checkAuth } from 'src/services/AuthService';
import createPublicService from 'src/store/dashboard/publicservices/actions/CreatePublicServiceAction';
import { resetStatus } from 'src/store/dashboard/publicservices/PublicServicesManagment';
import { basicFormErrorMessage } from 'src/components/shared/utils/ErrorHandling';
import { toggleInfoModal } from 'src/store/usermanagment/UserManagment';

import Modal from 'src/components/shared/Modal';
import StyledCard from 'src/components/dashboard/shared/StyledCard';
import { StyledTextField, StyledFormLabel } from 'src/components/shared/forms/FormElements';
import CustomAutocomplete from 'src/components/shared/forms/CustomAutocomplete';
import CategorySubcategorySelect from './CategorySubcategorySelect';

const CreatePublicService = ({ type }) => {
  const dispatch = useDispatch();
  const publicServices = useSelector(state => state.publicServices.publicServices);
  const regions = regionsConfiguration.map(region => region.name);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(publicServiceSchema),
  });

  const [confirmModal, setConfirmModal] = useState(false);

  const handleConfirmModalAgree = () => {
    setConfirmModal(false);
    dispatch(resetStatus());
  };

  const onSubmit = async data => {
    try {
      if (await checkAuth()) {
        data.service_type = type;
        dispatch(createPublicService(data));
      } else {
        dispatch(toggleInfoModal());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (publicServices.error) {
      setConfirmModal(true);
    }
    if (publicServices.success) {
      setConfirmModal(true);
      reset();
    }
  }, [publicServices.error, publicServices.success]);

  return (
    <>
      <Grid container>
        <Grid size={12}>
          <StyledCard variant={'outlined'} component="form" onSubmit={handleSubmit(onSubmit)} sx={{ border: 'none', boxShadow: 'none' }}>
            <CardContent sx={{ padding: 0 }}>
              <Typography variant="h5" mb={1}>
                {type === 'offer' ? 'Neues Angebot erstellen' : 'Neue Suchanfrage erstellen'}
              </Typography>
              <Typography color="textSecondary" mb={1}>
                {type === 'offer' ? 'Das neue Angebot ist öffentlich sichtbar !' : 'Die neue Suche ist öffentlich sichtbar !'}
              </Typography>
              <Box>
                <Grid container spacing={{ xs: 4, sm: 6 }}>
                  <CategorySubcategorySelect register={register} setValue={setValue} clearErrors={clearErrors} errors={errors} />

                  <Grid size={{ xs: 12, xl: 6 }}>
                    <CustomAutocomplete name="region" label="Region / Kanton" options={regions} error={errors.region} helperText={errors.region?.message} register={register('region')} />
                  </Grid>

                  <Grid size={{ xs: 12, xl: 6 }}>
                    <StyledFormLabel htmlFor="location" sx={{ mt: 0 }}>
                      Ort
                    </StyledFormLabel>
                    <StyledTextField type="text" name="location" id="location" {...register('location')} error={!!errors.location} helperText={errors.location?.message} />
                  </Grid>

                  <Grid size={12}>
                    <StyledFormLabel htmlFor="additional_location_info" sx={{ mt: 0 }}>
                      Zusätzliche Informationen zum Standort (z.B Angabe Umkreis.)
                    </StyledFormLabel>
                    <StyledTextField
                      type="text"
                      name="additional_location_info"
                      id="additional_location_info"
                      multiline
                      rows={1}
                      {...register('additional_location_info')}
                      error={!!errors.additional_location_info}
                      helperText={errors.additional_location_info?.message}
                    />
                  </Grid>

                  <Grid size={12}>
                    <StyledFormLabel htmlFor="title" sx={{ mt: 0 }}>
                      {type === 'offer' ? 'Titel Angebot' : 'Titel Suche'}
                    </StyledFormLabel>
                    <StyledTextField type="text" name="title" id="title" {...register('title')} error={!!errors.title} helperText={errors.title?.message} />
                  </Grid>

                  <Grid size={12}>
                    <StyledFormLabel htmlFor="description" sx={{ mt: 0 }}>
                      Beschreibung
                    </StyledFormLabel>
                    <StyledTextField
                      type="text"
                      name="description"
                      id="description"
                      multiline
                      rows={3}
                      {...register('description')}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={publicServices.loading}
                  sx={{ height: '45px', marginTop: '1rem', color: 'white', fontSize: '1rem', width: { xs: '100%', sm: '250px' } }}
                >
                  {publicServices.loading ? <CircularProgress size="25px" sx={{ color: 'white' }} /> : 'Erstellen'}
                </Button>
              </Box>
              {confirmModal && (
                <Modal
                  modalState={confirmModal}
                  handleCancel={handleConfirmModalAgree}
                  modalTitle={publicServices.error ? 'Bestätigung erforderlich' : 'Erfolgreich gespeichert'}
                  modalContent={
                    publicServices.error ? (
                      basicFormErrorMessage(publicServices.error)
                    ) : publicServices.success ? (
                      <Typography color="success">Erfolgreich gespeichert. Vielen Dank für deinen Beitrag!</Typography>
                    ) : (
                      ''
                    )
                  }
                  handleAgree={handleConfirmModalAgree}
                  usage="single-btn"
                />
              )}
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </>
  );
};

export default CreatePublicService;
