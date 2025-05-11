import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    colors: {
      main: '#293345',
      white: '#ffffff',
    },
    font: {
      primary: '#ffffff',
      secondary: '#7C8FAC',
    },
    text: {
      primary: '#ffffff',
      secondary: '#7C8FAC',
      dark: '#000',
    },
    background: {
      main: '#293345',
      primary: '#253662',
      secondary: '#5D87FF',
      third: 'rgb(28, 69, 93)',
      white: '#ffffff',
      lightgrey: '#eaeaea',
      dark: '#000',
    },
    form: {
      background: '#1a1f29',
    },
    border: {
      main: 'rgb(52,62,80)',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});

export { theme };
