import { styled } from '@mui/material/styles';
import { TextField, FormControlLabel, Checkbox, Typography } from '@mui/material';

const StyledTextField = styled(props => <TextField {...props} />)(({ theme }) => ({
  width: '100%',
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

const StyledFormLabel = styled(props => <Typography variant="subtitle1" color="textSecondary" fontWeight={600} {...props} component="label" htmlFor={props.htmlFor} />)(() => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
}));

/*
import Autocomplete from '@mui/material/Autocomplete';
// custom
import CustomTextField from '../../theme-elements/CustomTextField';
// Top 100 films as rated by IMDb users.
import top100Films from './data';

const ComboBoxAutocomplete = () => (
  <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={top100Films}
    fullWidth
    renderInput={(params) => (
      <CustomTextField {...params} placeholder="Select movie" aria-label="Select movie" />
    )}
  />
);

export default ComboBoxAutocomplete; */

export { StyledTextField, StyledCheckbox, StyledFormControlLabel, StyledFormLabel };
