import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';

import PieCard from './PieCard';
import BarCardSelection from './BarCardSelection';

function AnalyticsCards({ analyticsData }) {
  let totalServices = [];
  let offersPerCategory = [];
  let searchesPerCategory = [];
  let offersPerRegion = [];
  let searchesPerRegion = [];
  let registrationsPerMonthYear = [];
  let registrationsDetail = [];

  const transformRegistrationsDetailData = () => {
    if (!analyticsData.registrations_without_search_and_offer >= 0 && analyticsData.public_profiles) {
      registrationsDetail.push({ id: 0, value: analyticsData.registrations_without_search_and_offer, label: 'Registrierungen ohne Angebot/Suche' });
      registrationsDetail.push({ id: 1, value: analyticsData.public_profiles - analyticsData.registrations_without_search_and_offer, label: 'Registrierungen aktiv' });
    }
  };

  const transformTotalServicesData = () => {
    if (!analyticsData.offers >= 0 && !analyticsData.searches >= 0) {
      totalServices.push({ id: 0, value: analyticsData.offers, label: 'Dienstleistungen Angebote' });
      totalServices.push({ id: 1, value: analyticsData.searches, label: 'Dienstleistungen Suche' });
    }
  };

  const transformOffersPerCategoryData = () => {
    let index = 0;
    Object.keys(analyticsData.offers_per_category).forEach(key => {
      index += 1;
      offersPerCategory.push({ id: index, value: analyticsData.offers_per_category[key], label: key });
    });
  };

  const transformSearchesPerCategoryData = () => {
    let index = 0;
    Object.keys(analyticsData.searches_per_category).forEach(key => {
      index += 1;
      searchesPerCategory.push({ id: index, value: analyticsData.searches_per_category[key], label: key });
    });
  };

  const transformOffersPerRegionData = () => {
    let index = 0;
    Object.keys(analyticsData.offers_per_region).forEach(key => {
      index += 1;
      offersPerRegion.push({ id: index, value: analyticsData.offers_per_region[key], label: key });
    });
  };

  const transformSearchesPerRegionData = () => {
    let index = 0;
    Object.keys(analyticsData.searches_per_region).forEach(key => {
      index += 1;
      searchesPerRegion.push({ id: index, value: analyticsData.searches_per_region[key], label: key });
    });
  };

  const transformRegistrationsPerYearData = () => {
    analyticsData.registrations_per_month_and_year.forEach(entry => {
      let index = 0;
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
  };

  transformRegistrationsDetailData();
  transformTotalServicesData();
  transformOffersPerCategoryData();
  transformSearchesPerCategoryData();
  transformOffersPerRegionData();
  transformSearchesPerRegionData();
  transformRegistrationsPerYearData();

  return (
    <Grid container spacing={3}>
      <BarCardSelection barChartData={registrationsPerMonthYear} title={'Registrationen pro Jahr'} />
      <PieCard chartData={registrationsDetail} title={'Registrationen Details'} />
      <PieCard chartData={totalServices} title={'Alle Angebote/Suche'} />
      <PieCard chartData={offersPerCategory} title={'Angebote nach Kategorien'} />
      <PieCard chartData={searchesPerCategory} title={'Suche nach Kategorien'} />
      <PieCard chartData={offersPerRegion} title={'Angebote nach Region'} />
      <PieCard chartData={searchesPerRegion} title={'Suche nach Region'} />
    </Grid>
  );
}

export default AnalyticsCards;
