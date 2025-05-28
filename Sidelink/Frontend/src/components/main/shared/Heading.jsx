import { Typography, useTheme } from '@mui/material';

function Heading({ titleKey1, titleKey2 = '', titleKey3 = '', subTitle = '' }) {
  const theme = useTheme();

  return (
    <>
      <Typography
        variant="h1"
        fontWeight={700}
        lineHeight="1.2"
        color={theme.palette.text.primary}
        sx={{
          fontSize: {
            xs: '40px',
            sm: '56px',
          },
        }}
      >
        {`${titleKey1} `}
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: '40px',
              sm: '56px',
            },
          }}
          fontWeight={700}
          component="span"
        >
          {`${titleKey2} `}
        </Typography>
        {titleKey3}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.primary,
          fontSize: {
            xs: '22px',
            sm: '24px',
            opacity: '0.7',
          },
        }}
        fontWeight={700}
      >
        {subTitle}
      </Typography>
    </>
  );
}

export default Heading;
