import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { breadcrumpConfig } from 'src/config/NavigationConfigurations';
import { basicErrorMessageLink } from 'src/components/shared/utils/ErrorHandling';
import getAnalyticsData from 'src/store/dashboard/main/actions/GetAnalyticsDataAction';
import { checkAuth } from 'src/services/AuthService';
import { toggleInfoModal } from 'src/store/usermanagment/UserManagment';
import Breadcrumb from 'src/components/dashboard/shared/Breadcrumb';
import AnalyticsCards from './parts/AnalyticsCards';
import Spinner from 'src/components/shared/Spinner';

function Analytics() {
  const dispatch = useDispatch();
  const { analytics } = useSelector(state => state.dashboard);

  useEffect(() => {
    const initAnalyticsData = async () => {
      try {
        if (!analytics.loading && (await checkAuth())) {
          dispatch(getAnalyticsData());
        } else {
          dispatch(toggleInfoModal());
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (!analytics.success && !analytics.error && !analytics.loading) {
      initAnalyticsData();
    }
  }, [analytics, dispatch]);

  return (
    <Box component="section" sx={{ flexGrow: 1, padding: { xs: '5px', sm: '20px' } }}>
      <Breadcrumb title="Analysen" items={breadcrumpConfig.analysis} sx={{ margin: '30px 0' }} />
      {analytics.loading ? <Spinner size="4rem" /> : analytics.error ? basicErrorMessageLink(analytics.error) : analytics.success ? <AnalyticsCards analyticsData={analytics.data} /> : ''}
    </Box>
  );
}

export default Analytics;
