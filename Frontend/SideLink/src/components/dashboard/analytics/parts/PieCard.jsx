import { CardHeader, CardContent, Divider, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts';
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
            sx={{ color: 'black' }}
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
