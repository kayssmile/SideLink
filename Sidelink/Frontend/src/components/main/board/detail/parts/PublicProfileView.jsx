import { Avatar, Divider, Typography, Box, useTheme } from '@mui/material';

function PublicProfileView({ publicProfile }) {
  const theme = useTheme();
  const baseURL = import.meta.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';
  let publicProfileImageUrl = '';

  if (publicProfile.public_profile_picture) {
    publicProfileImageUrl = `${baseURL}${publicProfile.public_profile_picture}`;
  }

  return (
    <Box
      component="article"
      sx={{
        flexDirection: { xs: 'column' },
        padding: '2rem 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        borderRadius: '15px',
        border: '1px transparent solid',
        backgroundColor: theme.palette.background.primary,
      }}
    >
      <Avatar alt={publicProfile.showed_name} src={publicProfileImageUrl} sx={{ width: 140, height: 140 }} />

      <Box p={{ xs: '0.6rem', sm: '1.2rem' }}>
        <Typography variant="h6" sx={{ color: theme.palette.font.primary, fontWeight: '700', fontSize: { xs: '1.3rem', md: '1.5rem' }, textAlign: { xs: 'center' } }}>
          {publicProfile.showed_name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, fontSize: '1.2rem' }}>
          {publicProfile.description}
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
          Kontakt: {publicProfile.contact_info}
        </Typography>
      </Box>
    </Box>
  );
}

export default PublicProfileView;
