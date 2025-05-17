import { Box, TableCell, TableRow, Typography } from '@mui/material';
import 'src/assets/styles/main/noresults.scss';

import NoResults from 'src/assets/images/no_results.jpg';

function NoResult() {
  return (
    <TableRow>
      <TableCell colSpan={6} className="no-results">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'start', md: 'center' },
            justifyContent: { xs: 'start', md: 'center' },
            padding: { xs: '0', sm: '4rem' },
          }}
        >
          <Typography variant="h6" sx={{ fontSize: { xs: '1.2rem', sm: '2rem' }, color: 'text.white' }}>
            Keine Ergebnisse gefunden
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' }, color: 'text.secondary' }}>
            Versuche es mit einem anderen Suchbegriff
          </Typography>
          <img src={NoResults} alt="No results" />
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default NoResult;
