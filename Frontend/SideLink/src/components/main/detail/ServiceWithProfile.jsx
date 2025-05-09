import { Typography, Box, useTheme, useMediaQuery, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import StyledCard from 'src/components/dashboard/shared/StyledCard';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PublicServiceDetail from './parts/PublicServiceDetail';
import PublicProfileView from './parts/PublicProfileView';

function ServiceWithProfile() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const { id } = useParams();

  const { publicServices, publicProfiles } = useSelector(state => state.publicdata.publicData);

  const publicService = publicServices.find(service => service.id == id);
  const publicProfile = publicProfiles.data.find(profile => profile.public_profile_id == publicService.public_profile_id);

  return (
    <>
      <Box component="section" sx={{ padding: '2rem 0' }}>
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
          Connect.
        </Typography>

        <Grid container sx={{ backgroundColor: '' }}>
          <Grid size={12}>
            <StyledCard variant={'outlined'} sx={{ backgroundColor: theme.palette.background.main, marginTop: '2rem' }}>
              <CardContent>
                <Typography
                  variant="h2"
                  fontWeight={500}
                  lineHeight="1.2"
                  color={theme.palette.text.primary}
                  sx={{
                    fontSize: {
                      xs: '40px',
                      sm: '46px',
                    },
                  }}
                ></Typography>
                <PublicProfileView publicProfile={publicProfile} />
                <PublicServiceDetail publicService={publicService} />
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ServiceWithProfile;
