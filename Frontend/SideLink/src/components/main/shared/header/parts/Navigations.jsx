import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

export const NavLinks = [
  {
    title: 'Home',
    to: '/home',
  },
  {
    title: 'Board',
    to: '/board',
  },
  {
    title: 'Anleitung',
    to: '/instruction',
  },
];

const Navigations = () => {
  const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '1rem',
    color: theme.palette.font.secondary,
    borderRadius: `10px`,
    fontWeight: 500,
    padding: '0.3rem 2rem',
    [theme.breakpoints.down('md')]: {
      margin: '0.4rem 0rem',
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0 1rem',
      width: '200px',
    },
    '&:hover': {
      backgroundColor: theme.palette.background.primary,
      color: theme.palette.background.secondary,
    },
    '&.active': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },
  }));

  return (
    <>
      {NavLinks.map((navLink, i) => (
        <StyledButton component={NavLink} to={navLink.to} className={({ isActive }) => (isActive ? 'active' : '')} variant="text" key={i}>
          {navLink.title}
        </StyledButton>
      ))}
    </>
  );
};

export default Navigations;
