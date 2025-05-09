import { useEffect, useState } from 'react';
import { useMediaQuery, Typography, useTheme, Table, TableBody, TableHead, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Paper, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { checkAuth } from 'src/services/AuthService';
import getPublicprofile from 'src/store/publicdata/actions/GetPublicProfileAction';
import { resetPublicProfilesProcess } from 'src/store/publicdata/PublicDataManagment';

import ServicePreview from './ServicePreview';
import PaginationActions from './PaginationActions';
import NoResults from './NoResults';
import Modal from 'src/components/shared/Modal';

function Listing() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [infoModal, setInfoModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const { searchEngineData, publicProfiles } = useSelector(state => state.publicdata.publicData);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchEngineData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInfoModalAgree = () => {
    setInfoModal(false);
  };

  const handleSelectedService = async service => {
    if (await checkAuth()) {
      setSelectedService(service);
      const isPublicProfileLoaded = publicProfiles.data.find(profile => profile.public_profile_id === service.public_profile_id);
      if (isPublicProfileLoaded) {
        dispatch(resetPublicProfilesProcess());
        navigate('/service-profile/' + service.id);
      } else {
        dispatch(getPublicprofile(service.public_profile_id));
      }
    } else {
      setInfoModal(true);
    }
  };

  useEffect(() => {
    if (publicProfiles.success) {
      dispatch(resetPublicProfilesProcess());
      navigate('/service-profile/' + selectedService.id);
    }
  }, [publicProfiles.success]);

  return (
    <>
      <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.main, boxShadow: 'none' }}>
        <Table sx={{ minWidth: 500, backgroundColor: theme.palette.background.main, marginTop: '5rem' }} aria-label="Tabelle Suche und Angebote">
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderColor: theme.palette.border.main }}>
                <Typography variant="h6" fontSize="1rem">
                  Titel
                </Typography>
              </TableCell>
              <TableCell sx={{ borderColor: theme.palette.border.main }}>
                <Typography variant="h6" fontSize="1rem">
                  Kategorie
                </Typography>
              </TableCell>
              <TableCell sx={{ borderColor: theme.palette.border.main }}>
                <Typography variant="h6" fontSize="1rem">
                  Subkategorien
                </Typography>
              </TableCell>
              <TableCell sx={{ borderColor: theme.palette.border.main }}>
                <Typography variant="h6" fontSize="1rem">
                  Region / Ort
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <>
              {(rowsPerPage > 0 ? searchEngineData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : searchEngineData).map(publicService => (
                <ServicePreview {...publicService} key={publicService.id} onClick={() => handleSelectedService(publicService)} />
              ))}

              {searchEngineData.length === 0 && <NoResults />}

              {emptyRows > 0 && (
                <TableRow style={{ height: 100 * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'Alle', value: -1 }]}
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

      {infoModal && (
        <Modal
          modalState={infoModal}
          handleCancel={handleInfoModalAgree}
          modalTitle="Registrierung erforderlich"
          modalContent={
            <Typography color="success" align={'center'}>
              Passendes Angebot gefunden ?{' '}
              <Typography sx={{ marginTop: '1rem', color: 'black', textDecoration: 'underline', textAlign: 'center', a: { color: 'inherit' }, width: '30vw' }}>
                <Link to="/registration">Registriere dich kostenlos</Link>
              </Typography>
            </Typography>
          }
          handleAgree={handleInfoModalAgree}
          usage="single-btn"
        />
      )}
    </>
  );
}

export default Listing;
