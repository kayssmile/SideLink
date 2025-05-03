import { Box, TableCell, TableRow } from '@mui/material';
import { Typography } from '@mui/material';

import NoResults from 'src/assets/images/no_results.jpg';

function NoResult() {
  return (
    <TableRow>
      <TableCell colSpan={6} align="center">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '2rem', color: 'text.white' }}>
            Keine Ergebnisse gefunden
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '1.5rem', color: 'text.secondary' }}>
            Versuche es mit einem anderen Suchbegriff
          </Typography>
          <img src={NoResults} alt="No results" style={{ width: '400px', height: '320px', marginBottom: '1rem', marginTop: '2rem' }} />
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default NoResult;
