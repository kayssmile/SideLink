import { useEffect, useState } from 'react';
import { CardContent, Typography, Box, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from 'src/services/AuthService';
import { logoutService } from 'src/services/LogoutService';
import { getToken } from 'src/components/shared/utils/TokenUtils';
import { basicErrorMessageLink } from 'src/components/shared/utils/ErrorHandling';
import { toggleInfoModal } from 'src/store/usermanagment/UserManagment';
import { basicDelRequest } from 'src/services/BasicRequests';
import Modal from 'src/components/shared/Modal';
import StyledCard from 'src/components/dashboard/shared/StyledCard';

const AccountDelete = () => {
  const dispatch = useDispatch();
  const [deleteAccount, setDeleteAccount] = useState({ loading: false, error: false, success: false });
  const [confirmModal, setConfirmModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirmModalAgree = () => {
    setConfirmModal(false);
    setDeleteAccount({ ...deleteAccount, loading: true });
    handleDeleteAccount();
  };

  const handleCloseModal = () => {
    setConfirmModal(false);
  };

  const handleDeleteAccount = async () => {
    try {
      setDeleteAccount(prev => ({ ...prev, loading: true }));
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        dispatch(toggleInfoModal());
        return setDeleteAccount({ loading: false, error: null, success: false });
      }
      const token = getToken();
      if (!token) {
        throw new Error('Authentication token not available');
      }
      const response = await basicDelRequest(token);
      if (response.status === 204) {
        setDeleteAccount({ loading: false, success: true, error: null });
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      setDeleteAccount({
        loading: false,
        success: false,
        error: error instanceof Error ? { detail: error.message } : { detail: 'An unknown error occurred' },
      });
    }
  };

  useEffect(() => {
    if (deleteAccount.success) {
      setTimeout(() => {
        logoutService({ dispatch, navigate });
      }, 3000);
    }
  }, [deleteAccount, dispatch, navigate]);

  return (
    <Grid container>
      <Grid size={12}>
        <StyledCard variant={'outlined'} sx={{ height: '100%', border: 'none', boxShadow: 'none' }}>
          <CardContent sx={{ padding: { xs: '5px', sm: '16px' }, paddingTop: { xs: '20px' } }}>
            <Typography variant="h5" mb={1}>
              Account
            </Typography>
            <Typography color="textSecondary">Deinen Account löschen</Typography>
            {deleteAccount.error ? basicErrorMessageLink(deleteAccount.error) : deleteAccount.success ? <Typography color="success">Account erfolgreich gelöscht</Typography> : null}

            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                variant="contained"
                color="error"
                type="button"
                onClick={() => {
                  setConfirmModal(true);
                }}
                disabled={deleteAccount.loading || deleteAccount.success}
                sx={{ height: '45px', marginTop: '2rem', color: 'white', fontSize: '1rem', width: { xs: '100%', sm: '250px' } }}
              >
                {deleteAccount.loading ? <CircularProgress size="25px" sx={{ color: 'white' }} /> : 'Account löschen'}
              </Button>
            </Box>

            {confirmModal && (
              <Modal
                modalState={confirmModal}
                handleCancel={handleCloseModal}
                modalTitle="Bestätigung erforderlich"
                modalContent={<Typography color="success">Möchten Sie Ihren Account unwiderruflich löschen ? </Typography>}
                handleAgree={handleConfirmModalAgree}
              />
            )}
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default AccountDelete;
