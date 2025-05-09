import { useState } from 'react';
import { Box, useTheme, TextField, useMediaQuery, InputAdornment, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomeSearch() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue.trim() != '') {
      navigate('/board?search=' + encodeURIComponent(searchValue.trim()));
    }
  };

  return (
    <>
      <Box sx={{ position: 'relative', display: 'block' }}>
        <TextField
          fullWidth
          placeholder="Suche starten oder Angebot entdecken..."
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
            margin: '4rem 0',
            '& .MuiInputBase-input': {
              color: theme.palette.text.dark,
              fontSize: '1.5rem',
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
                  <Button variant="contained" sx={{ width: '200px', backgroundColor: theme.palette.background.secondary }} onClick={handleSearch}>
                    Suche
                  </Button>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </>
  );
}

export default HomeSearch;
