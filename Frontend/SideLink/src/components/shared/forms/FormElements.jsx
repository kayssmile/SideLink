import { styled } from '@mui/material/styles';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';

const StyledTextField = styled(props => <TextField {...props} />)(({ theme }) => ({
  input: {
    color: 'white',
  },
  '& .MuiOutlinedInput-input::placeholder': {
    color: '#7C8FAC !important',
    opacity: 1,
  },
  '& label': { color: '#7C8FAC' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#7C8FAC' },
    '&:hover fieldset': { borderColor: '#5D87FF' },
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: '#7C8FAC',
  '&.Mui-checked': {
    color: '#5D87FF',
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  color: 'white',
  '.MuiCheckbox-root': { paddingLeft: '0px' },
  margin: '0',
  svg: { marginLeft: '-3px' },
  div: {
    marginTop: '4px',
  },
  '& .MuiTypography-root': {
    color: '#7C8FAC',
    fontSize: '18px',
  },
}));

export { StyledTextField, StyledCheckbox, StyledFormControlLabel };
