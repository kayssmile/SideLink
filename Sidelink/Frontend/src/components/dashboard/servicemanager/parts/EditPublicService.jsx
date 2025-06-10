import { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, CircularProgress, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { publicServiceSchema } from 'src/config/Schemas';
import regionsConfiguration from 'src/config/LocationConfigurations';
import { checkAuth } from 'src/services/AuthService';
import putPublicService from 'src/store/dashboard/publicservices/actions/PutPublicServiceAction';
import { basicFormErrorMessage } from 'src/components/shared/utils/ErrorHandling';
import CategorySubcategorySelect from './CategorySubcategorySelect';
import { StyledTextField, StyledFormLabel } from 'src/components/shared/forms/FormElements';
import CustomAutocomplete from 'src/components/shared/forms/CustomAutocomplete';
import { toggleInfoModal } from 'src/store/usermanagment/UserManagment';

function EditPublicService({ service, handleCancel, modalState, type }) {
  const theme = useTheme();
  const publicServices = useSelector(state => state.publicServices.publicServices);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(publicServiceSchema),
  });
  const regions = regionsConfiguration.map(region => region.name);
  const initCategory = service.category_details;
  const initSubCategories = service.sub_categories_details?.map(subCategory => subCategory.name);

  const onSubmit = async data => {
    try {
      if (await checkAuth()) {
        data.service_type = type;
        data.public_service_id = service.id;
        dispatch(putPublicService(data));
      } else {
        dispatch(toggleInfoModal());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (service) {
      setValue('region', service.region_details);
      setValue('location', service.location_details);
      setValue('title', service.title);
      setValue('description', service.description);
      setValue('additional_location_info', service.additional_location_info);
    }
  }, [service, setValue]);

  return (
    <Dialog
      open={modalState}
      onClose={handleCancel}
      aria-labelledby="edit-service-title"
      fullWidth
      maxWidth="xl"
      sx={{
        '& .MuiPaper-root': {
          background: theme => theme.palette.background.main,
        },
      }}
    >
      <DialogTitle id="edit-service-title" color={'black'} sx={{ color: 'black', margin: '1rem 0' }}>
        <Typography variant="p" sx={{ color: theme.palette.text.primary }}>
          Eintrag bearbeiten:
          <br />
          <strong>{service.title}</strong>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box component="fieldset" disabled={publicServices.success} sx={{ borderColor: 'transparent' }}>
            <Grid container spacing={{ xs: 4, sm: 6 }}>
              <CategorySubcategorySelect control={control} setValue={setValue} clearErrors={clearErrors} errors={errors} initCategory={initCategory} initSubCategories={initSubCategories} />

              <Grid size={{ xs: 12, xl: 6 }}>
                <Controller
                  name="region"
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomAutocomplete
                      label="Region / Kanton"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      options={regions}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, xl: 6 }}>
                <StyledFormLabel htmlFor="location" sx={{ mt: 0 }}>
                  Ort
                </StyledFormLabel>
                <StyledTextField type="text" name="location" id="location" {...register('location')} error={!!errors.location} helperText={errors.location?.message} />
              </Grid>

              <Grid size={12}>
                <StyledFormLabel htmlFor="additional_location_info" sx={{ mt: 0 }}>
                  Zusätzliche Informationen zum Standort (z.B. Im Umkreis von 35km)
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

          <Box sx={{ mb: '1rem', mt: { xs: '1rem', sm: '2rem' } }}>
            {publicServices.error && basicFormErrorMessage(publicServices.error)}

            {publicServices.success && (
              <Typography color="success" sx={{ textAlign: 'center', fontSize: '20px' }}>
                Erfolgreich gespeichert. Vielen Dank für deinen Beitrag!
              </Typography>
            )}
          </Box>

          <Box mt={1} sx={{ display: 'flex', justifyContent: 'end' }}>
            {publicServices.success ? (
              <Button variant="contained" color="primary" onClick={handleCancel} sx={{ height: '45px', marginTop: '2rem', color: 'white', fontSize: '1rem', width: { xs: '100%', sm: '200px' } }}>
                Schliessen
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={publicServices.loading}
                sx={{ height: '45px', marginTop: '2rem', color: 'white', fontSize: '1rem', width: { xs: '100%', sm: '200px' } }}
              >
                {publicServices.loading ? <CircularProgress size="25px" sx={{ color: 'white' }} /> : 'Speichern'}
              </Button>
            )}
          </Box>
        </form>
      </DialogContent>
      <DialogActions sx={{ padding: '2rem 2rem' }}>
        <Button onClick={handleCancel} variant="outlined" color={'error'} size="large">
          Abbrechen
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditPublicService;
