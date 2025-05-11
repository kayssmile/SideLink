import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';

import PieCard from './PieCard';
import BarCardSelection from './BarCardSelection';

function AnalyticsCards({ analyticsData }) {
  const theme = useTheme();

  let totalServices = [];
  let offersPerCategory = [];
  let searchesPerCategory = [];
  let offersPerRegion = [];
  let searchesPerRegion = [];
  let registrationsPerMonthYear = [];
  let registrationsDetail = [];

  totalServices.push({ id: 0, value: analyticsData.offers, label: 'Dienstleistungen Angebote' });
  totalServices.push({ id: 1, value: analyticsData.searches, label: 'Dienstleistungen Suche' });

  registrationsDetail.push({ id: 0, value: analyticsData.registrations_without_search_and_offer, label: 'Registrierungen ohne Angebot/Suche' });
  registrationsDetail.push({ id: 2, value: analyticsData.public_profiles - analyticsData.registrations_without_search_and_offer, label: 'Registrierungen aktiv' });

  let index = 0;
  Object.keys(analyticsData.offers_per_category).forEach(key => {
    index += 1;
    offersPerCategory.push({ id: index, value: analyticsData.offers_per_category[key], label: key });
  });

  index = 0;
  Object.keys(analyticsData.searches_per_category).forEach(key => {
    index += 1;
    searchesPerCategory.push({ id: index, value: analyticsData.searches_per_category[key], label: key });
  });

  index = 0;
  Object.keys(analyticsData.offers_per_region).forEach(key => {
    index += 1;
    offersPerRegion.push({ id: index, value: analyticsData.offers_per_region[key], label: key });
  });

  index = 0;
  Object.keys(analyticsData.searches_per_region).forEach(key => {
    index += 1;
    searchesPerRegion.push({ id: index, value: analyticsData.searches_per_region[key], label: key });
  });

  analyticsData.registrations_per_month_and_year.forEach(entry => {
    index = 0;
    let newEntry = { id: index };
    for (const [key, value] of Object.entries(entry)) {
      index += 1;
      if (key === 'year') {
        newEntry.year = value;
      } else if (key === 'months') {
        newEntry.xAxis = [];
        newEntry.yAxis = [];
        for (const [key, monthValue] of Object.entries(value)) {
          newEntry.xAxis.push(key);
          newEntry.yAxis.push(monthValue);
        }
      } else {
        newEntry.total = value;
      }
    }
    registrationsPerMonthYear.push(newEntry);
  });

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <BarCardSelection barChartData={registrationsPerMonthYear} title={'Registrationen pro Jahr'} />
      </Grid>

      <PieCard chartData={offersPerCategory} title={'Angebote nach Kategorien'} />

      <PieCard chartData={searchesPerCategory} title={'Suche nach Kategorien'} />

      <PieCard chartData={offersPerRegion} title={'Angebote nach Region'} />

      <PieCard chartData={searchesPerRegion} title={'Suche nach Region'} />

      <PieCard chartData={registrationsDetail} title={'Registrationen Details'} />
    </Grid>
  );
}

export default AnalyticsCards;
