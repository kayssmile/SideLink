import { Divider, Chip, Typography, Box, Stack, useTheme } from '@mui/material';

function PublicServiceDetail({ publicService }) {
  const theme = useTheme();
  return (
    <Box
      component="article"
      sx={{
        flexDirection: { xs: 'column' },
        padding: '2rem 0rem',
        display: 'flex',
        marginTop: '2rem',
        borderRadius: '15px',
        border: '1px transparent solid',
        backgroundColor: theme.palette.background.primary,
      }}
    >
      <Typography variant="h3" sx={{ color: theme.palette.font.primary, fontWeight: '700', fontSize: { xs: '1.3rem', md: '1.5rem' }, textAlign: { xs: 'center' } }}>
        {publicService.service_type === 'search' ? 'Suche' : 'Angebot'}
      </Typography>
      <Typography variant="h4" sx={{ color: theme.palette.font.primary, fontWeight: '600', fontSize: { xs: '1.2rem', sm: '1.4rem' }, textAlign: { xs: 'center' }, margin: '1rem 0' }}>
        {publicService.title}
      </Typography>

      <Box p={{ xs: '0.6rem', sm: '1.2rem' }}>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.3rem', fontWeight: '400' }}>
          {publicService.description}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
          Kategorie: {publicService.category_details}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ marginBottom: 2, marginTop: 1, flexWrap: 'wrap' }}>
          {publicService.sub_categories_details?.map((subcat, index) => (
            <Chip key={index} label={subcat.name} size="middle" color="primary" sx={{ borderRadius: '6px', fontSize: '1rem' }} />
          ))}
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
          Region: {publicService.region_details}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
          Ort: {publicService.location_details}
        </Typography>
        {publicService.additional_location_info && (
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
            Weitere Infos: {publicService.additional_location_info}
          </Typography>
        )}
        <Divider sx={{ marginTop: '1rem', marginBottom: '0.5rem' }} />
        <Typography variant="caption" color={theme.palette.font.primary}>
          Zuletzt aktualisiert: {new Date(publicService.updated_at).toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
}

export default PublicServiceDetail;
