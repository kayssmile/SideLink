import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { toggleInfoModal } from 'src/store/usermanagment/UserManagment';

function InfoModal() {
  const dispatch = useDispatch();
  const { infoModal } = useSelector(state => state.userManagment);

  const handleClose = () => {
    dispatch(toggleInfoModal());
  };

  return (
    <Dialog open={infoModal} onClose={handleClose}>
      <DialogTitle>Information</DialogTitle>
      <DialogContent>
        <DialogContentText>Ihre Zugangsdaten sind abgelaufen, bitte melden Sie sich erneut an.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Schliessen
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InfoModal;
