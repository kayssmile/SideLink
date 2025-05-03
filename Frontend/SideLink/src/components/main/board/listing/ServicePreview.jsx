import { useState } from 'react';
import { Chip, Typography, Box, useTheme, useMediaQuery, Stack, TableCell, TableRow } from '@mui/material';

const ServicePreview = publicService => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <TableRow>
      <TableCell colSpan={6} sx={{ border: 'none', paddingBottom: '0' }}>
        <Box
          p={2}
          sx={{
            position: 'relative',
            cursor: 'pointer',
            //mb: 1.5,
            borderRadius: '8px',
            backgroundColor: theme.palette.background.lightgrey,
            '&:hover': { backgroundColor: '#c6c6c6' },
          }}
        >
          <Typography variant="h5" color={'black'} sx={{ opacity: '1', fontSize: '1.3rem', fontWeight: '600' }}>
            {publicService.title}
          </Typography>

          {/*
      <Typography variant="p" color={'black'} sx={{ opacity: '1', display: 'block', marginTop: '1rem', fontSize: '1.2rem' }}>
        {publicService.description}
      </Typography>  */}

          <Stack direction="row" sx={{ display: smDown ? 'flex' : 'block', flexWrap: 'wrap', marginTop: '0' }}>
            <Chip label={publicService.category_details} color="primary" size="small" sx={{ margin: '3px', marginLeft: '0', '&.MuiChip-root': { borderRadius: '6px' } }} />

            {publicService.sub_categories_details.map((subcat, index) => (
              <Chip key={index} label={subcat.name} size="small" color="primary" sx={{ margin: '3px', '&.MuiChip-root': { borderRadius: '6px' } }} />
            ))}
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center" mt={'5px'}>
            <Typography variant="p" color={'black'}>
              <strong>
                {publicService.region_details} | {publicService.location_details}
              </strong>
            </Typography>
          </Stack>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ServicePreview;
