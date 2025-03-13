import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    colors: {
      main: '#293345',
    },
    font: {
      primary: '#ffffff',
      secondary: '#7C8FAC',
    },
    background: {
      main: '#293345',
      primary: '#253662',
      secondary: '#5D87FF',
      third: 'rgb(28, 69, 93)',
      white: '#ffffff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export { theme };
