import { useMemo } from 'react';
import { CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';
import PublicService from './PublicService';
import StyledCard from 'src/components/dashboard/shared/StyledCard';

const OverviewPublicServices = ({ type }) => {
  const publicServices = useSelector(state => state.publicServices.publicServices);

  const publicServicesFiltered = useMemo(() => {
    if (!publicServices?.data) return [];
    return publicServices.data.filter(service => service.service_type === type);
  }, [publicServices, type]);

  return (
    <Grid container>
      <Grid size={12}>
        <StyledCard variant={'outlined'} sx={{ height: '100%', border: 'none', boxShadow: 'none' }}>
          <Typography variant="h5" mb={1}>
            Übersicht
          </Typography>
          <Typography color="textSecondary" mb={3}>
            {type === 'offer' ? 'Dienstleistungen Deine Angebote' : 'Dienstleistungen Deine Suche'}
          </Typography>
          <CardContent sx={{ height: '40vh', overflow: 'auto', overflowX: 'hidden', padding: { xs: '0', sm: '16px' } }}>
            {publicServicesFiltered.length === 0 ? (
              <Typography variant="h4" component="p" color="textSecondary">
                {type === 'offer' ? 'Keine Angebote vorhanden' : 'Keine Suche vorhanden'}
              </Typography>
            ) : (
              publicServicesFiltered.map(service => <PublicService key={service.id} service={service} type={type} />)
            )}
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default OverviewPublicServices;
