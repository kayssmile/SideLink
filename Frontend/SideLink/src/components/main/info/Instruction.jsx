import { NavLink } from 'react-router-dom';
import { Typography, Box, useTheme, Link } from '@mui/material';

import Heading from 'src/components/main/shared/Heading';
import InstructionsAccordion from './parts/InstructionsAccordeon';

function Instruction() {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ padding: '2rem 0' }}>
      <Heading titleKey1={'Read.'} titleKey2={'Make.'} titleKey3={'Start.'} subTitle={'Willkommen! Hier erfährst du Schritt für Schritt, wie du loslegst.'} />
      <Box sx={{ margin: { sx: '0 0', sm: '2rem 0', xl: '6rem 0' } }}>
        <InstructionsAccordion />
      </Box>

      <Link
        underline="none"
        color={theme.palette.text.primary}
        component={NavLink}
        to={'/contact'}
        sx={{
          margin: 'unset',
          color: theme.palette.text.primary,
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: '700',
            textAlign: 'center',
            fontSize: { xs: '1.4rem', sm: '1.6rem' },
            opacity: '0.7',
            margin: { xs: '2rem', sm: '6rem' },
          }}
        >
          Hast du noch Fragen ? Gerne helfen wir dir weiter!
        </Typography>
      </Link>
    </Box>
  );
}

export default Instruction;
