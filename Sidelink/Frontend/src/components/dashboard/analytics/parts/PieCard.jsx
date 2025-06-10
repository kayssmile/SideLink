import { CardHeader, CardContent, Divider, useTheme } from '@mui/material';
import { PieChart, chartsTooltipClasses } from '@mui/x-charts';
import Grid from '@mui/material/Grid2';
import StyledCard from 'src/components/dashboard/shared/StyledCard';

function PieCard({ chartData, title }) {
  const theme = useTheme();
  return (
    <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
      <StyledCard sx={{ padding: 0 }} elevation={9} variant={'outlined'}>
        <CardHeader title={title} sx={{ '.css-16xl4zq-MuiTypography-root': { fontSize: { xs: '1.2rem' } } }} />
        <Divider sx={{ border: '1px solid', borderColor: theme.palette.border.main }} />

        <CardContent>
          <PieChart
            sx={{ '.css-1fse7q7-MuiChartsWrapper-root': { flexDirection: 'column !important' } }}
            slotProps={{
              legend: {
                direction: 'column',
                sx: {
                  color: theme.palette.text.primary,
                },
              },
              tooltip: {
                sx: {
                  [`& .${chartsTooltipClasses.title}`]: {
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    paddingBottom: '4px',
                  },
                  [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.valueCell}`]: {
                    color: 'black',
                  },
                  [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.labelCell}`]: {
                    color: 'black',
                  },
                },
              },
            }}
            series={[
              {
                data: chartData,
              },
            ]}
            width={200}
            height={200}
            layout="vertical"
          />
        </CardContent>
      </StyledCard>
    </Grid>
  );
}

export default PieCard;
