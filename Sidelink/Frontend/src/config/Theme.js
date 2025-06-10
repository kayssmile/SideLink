import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    colors: {
      main: '#293345',
      white: '#ffffff',
    },
    font: {
      primary: '#ffffff',
      secondary: '#7C8FAC',
      hover: '#0202f7',
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
      xbs: 400,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});

const lightTheme = createTheme({
  palette: {
    colors: {
      main: '#293345',
      white: '#ffffff',
    },
    font: {
      primary: '#ffffff',
      secondary: '#7C8FAC',
      hover: '#0202f7',
    },
    text: {
      primary: '#000000',
      secondary: '#7C8FAC',
      dark: '#000',
    },
    background: {
      main: '#465675',
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
      xbs: 400,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});

export { darkTheme, lightTheme };

/*
font-size / mobile : 1.2rem
font-size / tablet : 1.4rem
font-size / desktop : 1.5rem
*/
