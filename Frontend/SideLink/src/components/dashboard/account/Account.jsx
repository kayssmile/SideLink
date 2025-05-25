import { useState } from 'react';
import { Divider, CardContent, Box, Tab, Tabs, useTheme, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { IconLock, IconUserCircle, IconPencilX } from '@tabler/icons-react';

import { breadcrumpConfig } from 'src/config/NavigationConfigurations';

import TabPanel from 'src/components/dashboard/shared/TabPanel';
import Breadcrumb from 'src/components/dashboard/shared/Breadcrumb';
import AccountDetails from 'src/components/dashboard/account/parts/AccountDetails';
import AccountDelete from 'src/components/dashboard/account/parts/AccountDelete';
import Credentials from 'src/components/dashboard/account/parts/Credentials';
import StyledCard from 'src/components/dashboard/shared/StyledCard';

const Account = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Breadcrumb title="Account Verwaltung" items={breadcrumpConfig.account} sx={{ margin: '30px 0' }} />

      <Box sx={{ maxWidth: '100%' }}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <StyledCard>
              <Box sx={{ position: 'relative', display: 'inline-block', maxWidth: 'calc(100vw - 32px)' }}>
                <Tabs
                  value={activeTab}
                  onChange={handleChange}
                  variant={smDown ? 'scrollable' : 'standard'}
                  scrollButtons={smDown ? 'auto' : false}
                  allowScrollButtonsMobile
                  sx={{
                    '& .MuiTabs-indicator': { backgroundColor: 'white' },
                  }}
                >
                  <Tab
                    data-testid="tab-account"
                    iconPosition="start"
                    icon={<IconUserCircle size="22" />}
                    label="Account"
                    sx={{ color: theme.palette.font.secondary, '&.Mui-selected': { color: 'white' }, minWidth: { xs: '100%', sm: 'auto' } }}
                  />
                  <Tab
                    iconPosition="start"
                    icon={<IconLock size="22" />}
                    label="Anmeldedaten"
                    sx={{ color: theme.palette.font.secondary, '&.Mui-selected': { color: 'white' }, minWidth: { xs: '100%', sm: 'auto' } }}
                  />
                  <Tab
                    iconPosition="start"
                    icon={<IconPencilX size="22" />}
                    label="Löschen"
                    sx={{ color: theme.palette.font.secondary, '&.Mui-selected': { color: 'white' }, minWidth: { xs: '100%', sm: 'auto' } }}
                  />
                </Tabs>
              </Box>

              <Divider />
              <CardContent
                sx={{
                  padding: { xs: '5px', sm: '16px' },
                  '&.cardcontent': { backgroundColor: theme.palette.background.main, border: '2px solid', borderColor: theme.palette.border.main, borderRadius: '8px' },
                }}
              >
                <TabPanel value={activeTab} index={0}>
                  <AccountDetails />
                </TabPanel>

                <TabPanel value={activeTab} index={1}>
                  <Credentials />
                </TabPanel>

                <TabPanel value={activeTab} index={2}>
                  <AccountDelete />
                </TabPanel>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
