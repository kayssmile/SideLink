import { CardHeader, CardContent, Divider, useTheme } from '@mui/material';
import { PieChart, chartsTooltipClasses } from '@mui/x-charts';
import Grid from '@mui/material/Grid2';

import StyledCard from 'src/components/dashboard/shared/StyledCard';

function PieCard({ chartData, title }) {
  const theme = useTheme();
  return (
    <Grid size={6}>
      <StyledCard sx={{ padding: 0 }} elevation={9} variant={'outlined'}>
        <CardHeader title={title} />
        <Divider sx={{ border: '1px solid', borderColor: theme.palette.border.main }} />

        <CardContent>
          <PieChart
            slotProps={{
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
          />
        </CardContent>
      </StyledCard>
    </Grid>
  );
}

export default PieCard;
