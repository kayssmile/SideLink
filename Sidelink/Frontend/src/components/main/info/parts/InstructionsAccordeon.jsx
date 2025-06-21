import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack, useTheme, Box, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

function InstructionsAccordion() {
  const theme = useTheme();

  const StyledTypography = styled(Typography)({
    fontSize: '1.2rem',
  });

  return (
    <Stack spacing={3} sx={{ padding: { xs: '2rem 0', xl: '0 0' } }}>
      <Accordion component="article">
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />} aria-controls="panel1-content" sx={{ backgroundColor: theme.palette.form.background }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: theme.palette.text.primary, fontSize: { xs: '1.1rem', md: '1.3rem' }, fontWeight: '600' }}>
            Wie funktioniert alles?
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: theme.palette.background.lightgrey, padding: '2rem' }}>
          <Box component="ul" sx={{ pl: 3, color: theme.palette.text.dark, margin: '0 0' }}>
            <StyledTypography component="li">
              Registriere dich kostenlos über <Link to={'/registration'}>Registration</Link>.
            </StyledTypography>
            <StyledTypography component="li">
              Logge dich anschließend hier ein: <Link to={'/login'}>Login</Link>.
            </StyledTypography>
            <StyledTypography component="li">
              Im Dashboard angekommen, erstelle dein <strong>öffentliches Profil</strong>. Es hilft anderen, dich zu finden und mehr über deine Angebote oder Suchen zu erfahren.
            </StyledTypography>
            <StyledTypography component="li">
              Lege direkt los mit deinem ersten <strong>Service</strong> – dieser wird automatisch auf der Plattform sichtbar und ist bereit für Anfragen.
            </StyledTypography>
            <StyledTypography component="li">Du kannst jederzeit Änderungen vornehmen und Services aktualisieren – ganz flexibel. </StyledTypography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion component="article">
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />} aria-controls="panel2-content" sx={{ backgroundColor: theme.palette.form.background }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: theme.palette.text.primary, fontSize: { xs: '1.1rem', md: '1.3rem' }, fontWeight: '600' }}>
            Begin – Dein öffentliches Profil
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: theme.palette.background.lightgrey, padding: '2rem' }}>
          <Typography sx={{ color: theme.palette.text.dark, fontSize: '1.2rem' }}>
            Dein Profil ist dein Aushängeschild. Lade ein Bild hoch, schreibe eine kurze Vorstellung und beschreibe, was du anbietest oder suchst. Je klarer und authentischer dein Profil, desto besser
            finden dich passende Anfragen. Du kannst dein Profil jederzeit bearbeiten und erweitern.
            <br />
            Wichtig ist das dein Profil wird genutz um dich zu kontaktieren schaue das du auch erreichbar bist.
            <br />
            <strong>Benutzer können Bewertungen erstellen welche öffentlich sichtbar sind, achte auf deine Seriösität</strong>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion component="article">
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />} aria-controls="panel3-content" sx={{ backgroundColor: theme.palette.form.background }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: theme.palette.text.primary, fontSize: { xs: '1.1rem', md: '1.3rem' }, fontWeight: '600' }}>
            Complete – Services erstellen & anbieten
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: theme.palette.background.lightgrey, padding: '2rem' }}>
          <Typography sx={{ color: theme.palette.text.dark, fontSize: '1.2rem' }}>
            Erstelle individuelle Services mit Titel, Beschreibung und Ortsangabe. Deine Angebote erscheinen automatisch auf der Plattform und können direkt angefragt werden.
            <br />
            <strong>Service gespeichert? Dann ist er öffentlich sichtbar.</strong>
            <br />
            Du kannst deine Angebote oder Suchen jederzeit flexibel anpassen.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

export default InstructionsAccordion;
