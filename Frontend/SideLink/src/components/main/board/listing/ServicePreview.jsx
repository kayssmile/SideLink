import { Chip, Typography, useTheme, useMediaQuery, Stack, TableCell, TableRow } from '@mui/material';

function ServicePreview({ title, category_details, sub_categories_details, region_details, location_details, onClick }) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <TableRow sx={{ '&:hover': { backgroundColor: theme.palette.background.primary }, cursor: 'pointer' }} onClick={onClick}>
      <TableCell sx={{ borderColor: theme.palette.border.main }}>
        <Typography variant="h5" color={'white'} sx={{ opacity: '1', fontSize: '1rem', fontWeight: '500' }}>
          {title}
        </Typography>
      </TableCell>

      <TableCell sx={{ borderColor: theme.palette.border.main }}>
        <Chip label={category_details} color="primary" size="small" sx={{ marginLeft: '0', '&.MuiChip-root': { borderRadius: '6px' } }} />
      </TableCell>

      <TableCell sx={{ borderColor: theme.palette.border.main }}>
        <Stack sx={{ display: smDown ? 'flex' : 'block', flexWrap: 'wrap', flexGap: 2 }}>
          {sub_categories_details.map((subcat, index) => (
            <Chip key={index} label={subcat.name} size="small" color="primary" sx={{ marginBottom: '3px', marginRight: '2px', '&.MuiChip-root': { borderRadius: '6px' } }} />
          ))}
        </Stack>
      </TableCell>

      <TableCell sx={{ borderColor: theme.palette.border.main }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="p" color={'white'} fontSize="1rem">
            {region_details} | {location_details}
          </Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default ServicePreview;
