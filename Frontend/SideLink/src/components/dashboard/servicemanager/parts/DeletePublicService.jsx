import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, CircularProgress, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { checkAuth } from 'src/services/AuthService';
import deletePublicService from 'src/store/dashboard/publicservices/actions/DeletePublicServiceAction';
import { getDeletePublicServiceErrorMessage } from 'src/components/shared/ErrorHandling';

function DeletePublicService({ service, handleCancel, handleCancelWithSuccess, modalState, type }) {
  const theme = useTheme();
  const publicServices = useSelector(state => state.publicservices.publicServices);
  const dispatch = useDispatch();

  const handleDeletePublicService = async () => {
    try {
      if (await checkAuth()) {
        dispatch(deletePublicService(service.id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={modalState} onClose={handleCancel} aria-labelledby="delete-service-title" fullWidth maxWidth="xl">
      <DialogTitle id="edit-service-title" sx={{ color: 'black', margin: '1rem 0', textAlign: 'center' }}>
        Bestätigung erforderlich
      </DialogTitle>
      <DialogContent>
        {publicServices.success ? (
          <Typography color="success" sx={{ textAlign: 'center', fontSize: '20px' }}>
            Service erfolgreich gelöscht
          </Typography>
        ) : publicServices.error ? (
          getDeletePublicServiceErrorMessage(publicServices.error)
        ) : (
          <Typography sx={{ color: theme.palette.text.dark, textAlign: 'center' }}>
            Möchten Sie {type === 'offer' ? 'Angebot: ' : 'Suche: '} <strong>{service.title} </strong> definitiv löschen?
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ padding: '2rem 2rem' }}>
        {publicServices.success | publicServices.error ? (
          <Button onClick={handleCancelWithSuccess} variant="outlined" size="large">
            Schliessen
          </Button>
        ) : (
          <>
            <Button onClick={handleCancel} disabled={publicServices.loading} variant="outlined" color={'error'} size="large">
              Abbrechen
            </Button>
            <Button onClick={handleDeletePublicService} disabled={publicServices.loading} autoFocus variant="outlined" size="large">
              {publicServices.loading ? <CircularProgress size="25px" sx={{ color: theme.palette.text.dark }} /> : 'Bestätigen'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DeletePublicService;
