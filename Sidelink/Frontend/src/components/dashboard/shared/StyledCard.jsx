import { Card, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  border: '1px solid',
  boxShadow: '0 0 2px 0 rgba(183, 192, 206, 0.2)',
  borderColor: theme.palette.border.main,
  borderRadius: '8px',
}));

export default StyledCard;
