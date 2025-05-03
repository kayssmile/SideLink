import { useState } from 'react';
import { useTheme, Box, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Paper, IconButton } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { Chip, Typography, useMediaQuery, Stack, Tooltip } from '@mui/material';

import { Link } from 'react-router-dom';

import ServicePreview from './ServicePreview';
import PaginationActions from './PaginationActions';
import NoResults from './NoResults';

function Listing() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();

  const { searchEngineData } = useSelector(state => state.publicdata.publicData);

  console.log('listing komponentData', searchEngineData);
  //console.log('publicServicesSearchEngine', publicServices);
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - publicServices.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500, height: '50vh', maxHeight: '50vh', overflow: 'scroll', backgroundColor: theme.palette.background.primary, border: '5px' }} aria-label="custom pagination table">
        <TableBody>
          <>
            {(rowsPerPage > 0 ? searchEngineData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : searchEngineData).map(publicService => (
              <ServicePreview {...publicService} key={publicService.id} />
            ))}

            {searchEngineData.length === 0 && <NoResults />}

            {emptyRows > 0 && (
              <TableRow style={{ height: 100 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </>
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={searchEngineData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Ergebnisse pro Seite"
              slotProps={{
                select: {
                  native: true,
                  sx: {
                    minHeight: '3rem',
                    color: 'white',
                    fontSize: '1.2rem', // Schriftgröße für das Select
                    '& option': {
                      backgroundColor: '#333', // optional: Dropdown-Hintergrund
                      color: 'white',
                    },
                  },
                },
              }}
              sx={{
                border: 'none',
                color: 'white',
                '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                  color: 'white',
                  fontSize: '1.2rem',
                },
                '.MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={PaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default Listing;
