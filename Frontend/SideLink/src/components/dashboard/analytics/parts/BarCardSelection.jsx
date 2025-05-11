import { useState } from 'react';
import { Typography, MenuItem, Select, CardHeader, CardContent, Divider, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts';

import StyledCard from 'src/components/dashboard/shared/StyledCard';

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
            width: '20%',
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
          <BarChart series={[{ data: chartData.yAxis }]} height={290} xAxis={[{ data: chartData.xAxis }]} />
        ) : (
          <Typography variant="h6" color="textSecondary" align="center">
            Keine Daten gefunden.
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
}

export default BarChartSelection;
