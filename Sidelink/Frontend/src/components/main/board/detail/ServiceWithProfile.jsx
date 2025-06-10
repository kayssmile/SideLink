import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getPublicprofile from 'src/store/publicdata/actions/GetPublicProfileAction';
import Heading from 'src/components/main/shared/Heading';
import PublicServiceDetail from './parts/PublicServiceDetail';
import PublicProfileView from './parts/PublicProfileView';
import Spinner from 'src/components/shared/Spinner';

function ServiceWithProfile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { publicServices, publicProfiles, loading } = useSelector(state => state.publicData.publicData);
  const publicService = publicServices.find(service => String(service.id) === String(id));

  useEffect(() => {
    if (publicService && !publicProfiles.loading && !publicProfiles?.data?.some(p => p.public_profile_id === publicService.public_profile_id)) {
      dispatch(getPublicprofile(publicService.public_profile_id));
    }
  }, [publicProfiles, publicServices]);

  const publicProfile = publicProfiles?.data?.find(profile => profile.public_profile_id === publicService.public_profile_id);

  return (
    <Box component="section" sx={{ padding: '2rem 0' }}>
      <Heading titleKey1={'Connect.'} />

      {loading || publicProfiles.loading ? (
        <Spinner />
      ) : publicProfile ? (
        <Grid container>
          <Grid size={12}>
            <PublicProfileView publicProfile={publicProfile} />
            <PublicServiceDetail publicService={publicService} />
          </Grid>
        </Grid>
      ) : (
        <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
          Profil nicht gefunden! Bitte versuche es später erneut oder lade die Seite neu.
        </Typography>
      )}
    </Box>
  );
}

export default ServiceWithProfile;
