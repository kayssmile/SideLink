import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function Modal({ modalTitle, modalContent, modalState, handleAgree, handleCancel, usage = 'standard' }) {
  return (
    <Dialog open={modalState} onClose={handleCancel} aria-labelledby="modal-title">
      <DialogTitle id="modal-title" color={'black'}>
        {modalTitle}
      </DialogTitle>
      <DialogContent>{modalContent}</DialogContent>
      <DialogActions>
        {usage === 'standard' ? (
          <>
            <Button onClick={handleCancel} variant="outlined" color={'error'}>
              Abbrechen
            </Button>
            <Button onClick={handleAgree} autoFocus variant="outlined">
              Bestätigen
            </Button>
          </>
        ) : (
          <Button onClick={handleAgree} autoFocus variant="outlined">
            Schliessen
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
