import { useRef, useEffect, useState } from 'react';
import { CardContent, Typography, Box, Button, CircularProgress, useMediaQuery, Stack, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { publicProfileSchema } from 'src/config/Schemas';
import { checkAuth } from 'src/services/AuthService';
import { breadcrumpConfig } from 'src/config/NavigationConfigurations';
import patchPublicProfile from 'src/store/dashboard/publicprofile/actions/PatchPublicProfileAction';
import { resetProcess } from 'src/store/dashboard/publicprofile/PublicProfileManagment';
import { getChangePublicProfileErrorMessage } from 'src/components/shared/ErrorHandling';

import Modal from 'src/components/dashboard/shared/Modal';
import Breadcrumb from 'src/components/dashboard/shared/Breadcrumb';
import StyledCard from 'src/components/dashboard/shared/StyledCard';
import { StyledTextField, StyledFormLabel } from 'src/components/shared/forms/FormElements';

function PublicProfile() {
  const dispatch = useDispatch();
  const { publicProfile } = useSelector(state => state.publicprofile);
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(publicProfileSchema),
  });

  const baseURL = import.meta.env.BASE_URL.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';
  let publicProfileImageUrl = '';
  const fileInputRef = useRef(null);

  if (publicProfile.data.public_profile_picture) {
    publicProfileImageUrl = `${baseURL}${publicProfile.data.public_profile_picture}`;
  }

  /*
prüfen weshalb beim bearbeiten eine andere service angezeigt wird
prüfen wie ich alle reduxthunks vereinheitlichen kann 
*/

  const [confirmModal, setConfirmModal] = useState(false);

  const handleConfirmModalAgree = () => {
    setConfirmModal(false);
    dispatch(resetProcess());
  };

  const handleReset = () => {
    resetField('profile_picture');
    clearErrors('profile_picture');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /*
   * @description: create formdata to send image-file-data to backend
   */
  const onSubmit = async data => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (key !== 'profile_picture') {
        formData.append(key, data[key]);
      }
    });
    if (data.profile_picture != null && data.profile_picture[0]) {
      formData.append('public_profile_picture', data.profile_picture[0]);
    }

    try {
      if (await checkAuth()) {
        dispatch(patchPublicProfile(formData));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (publicProfile.data) {
      setValue('showed_name', publicProfile.data.showed_name);
      setValue('description', publicProfile.data.description);
      setValue('contact_info', publicProfile.data.contact_info);
    }
  }, [publicProfile.data, setValue]);

  useEffect(() => {
    if (publicProfile.error || publicProfile.success) {
      setConfirmModal(true);
    }
  }, [publicProfile.error, publicProfile.success]);

  return (
    <>
      <Breadcrumb title="Dein öffentliches Profil" items={breadcrumpConfig.publicProfile} sx={{ margin: '30px 0' }} />
      <Grid container>
        <Grid size={12}>
          <StyledCard sx={{ padding: '24px', paddingTop: '0' }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}></Box>

            <CardContent component="form" onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="h5" mb={1}>
                Öffentliches Profil
              </Typography>
              <Typography color="textSecondary" mb={3}>
                Erstelle hier dein öffentliches Profil, es ist für andere registrierte Benutzer sichtbar. Du kannst es jederzeit anpassen.
              </Typography>

              <Box mt={8}>
                <Typography component="label" htmlFor="profile_picture" sx={{ color: 'white', fontSize: 20, display: 'block', mb: 1 }}>
                  Profilbild
                </Typography>
                <Avatar src={publicProfileImageUrl} alt="Publicprofile image" sx={{ width: 150, height: 150, margin: '0 auto' }} />
                <Stack sx={{ display: 'flex', flexDirection: smDown ? 'column' : 'row', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
                  <Button variant="contained" color="primary">
                    <input ref={fileInputRef} accept="image/*" name="profile_picture" type="file" multiple={false} style={{ maxWidth: '100%' }} {...register('profile_picture')} />
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleReset} sx={{ px: 3, fontSize: '1rem', marginLeft: smDown ? '0' : '1rem', marginTop: smDown ? '1rem' : '0' }}>
                    Reset
                  </Button>
                </Stack>
                {errors.profile_picture && (
                  <Typography color="error" sx={{ mt: '10px' }}>
                    {errors.profile_picture.message}
                  </Typography>
                )}
              </Box>

              <Box>
                <Grid container spacing={smDown ? 1 : 2} mt={6}>
                  <Grid size={12}>
                    <StyledFormLabel htmlFor="showed_name" sx={{ mt: 0 }}>
                      Anzeigename
                    </StyledFormLabel>
                    <StyledTextField type="text" name="showed_name" id="showed_name" {...register('showed_name')} error={!!errors.showed_name} helperText={errors.showed_name?.message} />
                  </Grid>

                  <Grid size={12}>
                    <StyledFormLabel htmlFor="description">Einleitungstext / Über mich</StyledFormLabel>
                    <StyledTextField
                      type="text"
                      name="description"
                      id="description"
                      multiline
                      rows={4}
                      {...register('description')}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  </Grid>

                  <Grid size={12}>
                    <StyledFormLabel htmlFor="contact_info">Kontaktinformationen</StyledFormLabel>
                    <StyledTextField
                      type="text"
                      name="contact_info"
                      id="contact_info"
                      multiline
                      rows={4}
                      {...register('contact_info')}
                      error={!!errors.contact_info}
                      helperText={errors.contact_info?.message}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box mt={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={publicProfile.loading}
                  sx={{ height: '45px', marginTop: '2rem', color: 'white', fontSize: '1rem', width: smDown ? '100%' : '250px' }}
                >
                  {publicProfile.loading ? <CircularProgress size="25px" sx={{ color: 'white' }} /> : 'Speichern'}
                </Button>
              </Box>
            </CardContent>
            {confirmModal && (
              <Modal
                modalState={confirmModal}
                handleCancel={handleConfirmModalAgree}
                modalTitle="Bestätigung erforderlich"
                modalContent={
                  publicProfile.error ? (
                    getChangePublicProfileErrorMessage(publicProfile.error)
                  ) : publicProfile.success ? (
                    <Typography color="success">Dein öffentliches Profil wurde erfolgreich aktualisiert.</Typography>
                  ) : (
                    ''
                  )
                }
                handleAgree={handleConfirmModalAgree}
                usage="single-btn"
              />
            )}
          </StyledCard>
        </Grid>
      </Grid>
    </>
  );
}

export default PublicProfile;
