import { useState } from 'react';
import { Box, useTheme, TextField, useMediaQuery, InputAdornment, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomeSearch() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue.trim() != '') {
      navigate('/board?search=' + encodeURIComponent(searchValue.trim()));
    }
  };

  return (
    <Box sx={{ position: 'relative', display: 'block' }}>
      <TextField
        fullWidth
        placeholder={mdDown ? 'Suche starten...' : 'Suche starten oder Angebot entdecken...'}
        variant="outlined"
        value={searchValue}
        onChange={event => {
          setSearchValue(event.target.value);
        }}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            handleSearch();
          }
        }}
        sx={{
          borderRadius: '8px',
          margin: lgDown ? '2rem 0' : '4rem 0',
          marginBottom: lgDown ? '0.2rem' : '4rem',
          '& .MuiInputBase-input': {
            color: theme.palette.text.dark,
            fontSize: smDown ? '1.2rem' : '1.5rem',
            fontWeight: '500',
          },
          '& .MuiInputBase-root': {
            backgroundColor: theme.palette.background.white,
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" sx={{ display: smDown ? 'none' : 'inline-block', width: '200px', backgroundColor: theme.palette.background.secondary }} onClick={handleSearch}>
                  Suche
                </Button>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button variant="contained" sx={{ display: smDown ? 'inline-block' : 'none', width: '100%', backgroundColor: theme.palette.background.secondary, marginTop: '1rem' }} onClick={handleSearch}>
        Suche
      </Button>
    </Box>
  );
}

export default HomeSearch;
