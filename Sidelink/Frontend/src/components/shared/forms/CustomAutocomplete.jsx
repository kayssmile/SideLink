import { Autocomplete } from '@mui/material';
import { StyledFormLabel, StyledTextField } from 'src/components/shared/forms/FormElements';

const CustomAutocomplete = ({ label, name, value, options, multiple = false, onChange, error, helperText, register }) => {
  return (
    <>
      <StyledFormLabel sx={{ marginTop: '0' }} htmlFor={name}>
        {label}
      </StyledFormLabel>
      <Autocomplete
        disablePortal
        id={name}
        name={name}
        multiple={multiple}
        disableCloseOnSelect={multiple}
        options={options}
        value={value ?? ''}
        onChange={onChange ? (e, newValue) => onChange(newValue) : false}
        fullWidth
        renderInput={params => <StyledTextField {...params} placeholder={`Wähle ${label}`} aria-label={`${label} Auswahl`} error={!!error} helperText={helperText} {...(register ? register : {})} />}
        slotProps={{
          popupIndicator: {
            sx: { color: 'white', svg: { width: '2rem', height: '2rem' } },
          },
          clearIndicator: {
            sx: { color: 'white', svg: { width: '1rem', height: '1rem' } },
          },
          paper: {
            sx: { color: 'black', backgroundColor: 'white !important' },
          },
        }}
      />
    </>
  );
};

export default CustomAutocomplete;
