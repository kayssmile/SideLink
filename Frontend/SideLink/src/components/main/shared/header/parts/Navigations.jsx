import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { navLinks } from 'src/config/NavigationConfigurations';

const Navigations = () => {
  const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '1rem',
    color: theme.palette.font.secondary,
    borderRadius: `5px`,
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
      {navLinks.map((navLink, i) => (
        <StyledButton component={NavLink} to={navLink.to} className={({ isActive }) => (isActive ? 'active' : '')} variant="text" key={i}>
          {navLink.title}
        </StyledButton>
      ))}
    </>
  );
};

export default Navigations;
