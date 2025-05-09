import { Divider, Chip, Typography, Box, useTheme, useMediaQuery, Stack } from '@mui/material';

function PublicServiceDetail({ publicService }) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <>
      <Box component="article" sx={{ padding: '2rem 2rem', borderRadius: '15px', border: '1px transparent solid' }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          {publicService.title}
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.3rem', fontWeight: '400' }}>
          {publicService.description}
        </Typography>

        <Divider sx={{ marginY: 2 }} />

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

        <Divider sx={{ marginY: 2 }} />

        <br />
        <Typography variant="caption" color="">
          Zuletzt aktualisiert: {new Date(publicService.updated_at).toLocaleDateString()}
        </Typography>
      </Box>
    </>
  );
}

export default PublicServiceDetail;
