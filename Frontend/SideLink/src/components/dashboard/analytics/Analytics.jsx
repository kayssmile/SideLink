import { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { breadcrumpConfig } from 'src/config/NavigationConfigurations';
import { errorMessage } from 'src/components/shared/ErrorHandling';
import getAnalyticsData from 'src/store/dashboard/main/actions/GetAnalyticsDataAction';
import { checkAuth, getToken } from 'src/services/AuthService';

import Breadcrumb from 'src/components/dashboard/shared/Breadcrumb';
import AnalyticsCards from './parts/AnalyticsCards';
import GradientCircularProgress from 'src/components/shared/Spinner';

function Analytics() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { analytics } = useSelector(state => state.dashboard);

  const initAnalyticsData = async () => {
    try {
      if (await checkAuth()) {
        const token = getToken();
        if (token) {
          dispatch(getAnalyticsData(token));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!analytics.success && !analytics.error && !analytics.loading) {
      initAnalyticsData();
    }
  }, [analytics]);

  return (
    <>
      <Box component="section" sx={{ flexGrow: 1, padding: '20px' }}>
        <Breadcrumb title="Analysen" items={breadcrumpConfig.analysis} sx={{ margin: '30px 0' }} />
        {analytics.loading ? <GradientCircularProgress size="4rem" /> : analytics.error ? errorMessage(analytics.error) : <AnalyticsCards analyticsData={analytics.data} />}
      </Box>
    </>
  );
}

export default Analytics;
