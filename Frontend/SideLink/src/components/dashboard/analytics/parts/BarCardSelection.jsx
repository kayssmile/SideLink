import { useState } from 'react';
import { Typography, MenuItem, Select, CardHeader, CardContent, Divider, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { BarChart, chartsTooltipClasses } from '@mui/x-charts';

import StyledCard from 'src/components/dashboard/shared/StyledCard';
import Scrollbar from 'src/components/shared/custom-scroll/Scrollbar';

function BarChartSelection({ barChartData, title }) {
  const theme = useTheme();
  const [year, setYear] = useState(barChartData[0].year);
  const [chartData, setChartData] = useState({ xAxis: barChartData[0].xAxis, yAxis: barChartData[0].yAxis });

  const handleSelectionChange = value => {
    setYear(value);
    let newChartData = barChartData.find(data => data.year === value);
    if (newChartData) {
      setChartData(newChartData);
    } else {
      setChartData(null);
    }
  };

  return (
    <Grid size={12}>
      <StyledCard sx={{ padding: 0 }} elevation={9} variant={'outlined'}>
        <CardHeader title={title} />
        <Divider sx={{ border: '1px solid', borderColor: theme.palette.border.main }} />

        <CardContent>
          <Select
            displayEmpty
            labelId="service-type-label"
            id="service-type"
            value={year}
            onChange={event => handleSelectionChange(event.target.value)}
            sx={{
              width: { xs: '60%', md: '20%' },
              margin: '0.7rem 0',
              color: '#7C8FAC',
              '& .MuiSelect-icon': {
                color: 'white',
                fontSize: '2rem',
                width: '2rem',
                height: '2rem',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#7C8FAC',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#5D87FF',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#5D87FF',
              },
              '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#5D87FF',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: 'white',
                  color: 'black',
                },
              },
            }}
          >
            {barChartData.map((yearData, index) => (
              <MenuItem key={index} value={yearData.year}>
                {yearData.year}
              </MenuItem>
            ))}
          </Select>
          {chartData ? (
            <Scrollbar>
              <BarChart
                series={[{ data: chartData.yAxis, label: 'Registrationen' }]}
                height={290}
                xAxis={[{ data: chartData.xAxis }]}
                yAxis={[{ tickMinStep: 1 }]}
                slotProps={{
                  tooltip: {
                    trigger: 'item',
                    sx: {
                      [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.valueCell}`]: {
                        color: 'black',
                      },
                      [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.labelCell}`]: {
                        color: 'black',
                      },
                    },
                  },
                }}
              />{' '}
            </Scrollbar>
          ) : (
            <Typography variant="h6" color="textSecondary" align="center">
              Keine Daten gefunden.
            </Typography>
          )}
        </CardContent>
      </StyledCard>
    </Grid>
  );
}

export default BarChartSelection;
