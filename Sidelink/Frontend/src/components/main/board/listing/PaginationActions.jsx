import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import PropTypes from 'prop-types';
import { useTheme, Box, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Paper, IconButton } from '@mui/material';

function PaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = event => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page" sx={{ color: 'white' }}>
        <FirstPageIcon sx={{ color: 'white', fontSize: 32 }} />
      </IconButton>

      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page" sx={{ color: 'white' }}>
        <KeyboardArrowLeft sx={{ color: 'white', fontSize: 32 }} />
      </IconButton>

      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page" sx={{ color: 'white' }}>
        <KeyboardArrowRight sx={{ color: 'white', fontSize: 32 }} />
      </IconButton>

      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page" sx={{ color: 'white' }}>
        <LastPageIcon sx={{ color: 'white', fontSize: 32 }} />
      </IconButton>
    </Box>
  );
}

PaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default PaginationActions;
