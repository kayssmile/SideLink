import { useState } from 'react';
import { Divider, CardContent, Box, Tab, Tabs, useTheme, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { IconLock, IconUserCircle } from '@tabler/icons-react';

import { breadcrumpConfig } from 'src/config/NavigationConfigurations';

import TabPanel from 'src/components/dashboard/shared/TabPanel';
import Breadcrumb from 'src/components/dashboard/shared/Breadcrumb';
import AccountDetails from 'src/components/dashboard/account/parts/AccountDetails';
import Credentials from 'src/components/dashboard/account/parts/Credentials';
import StyledCard from 'src/components/dashboard/shared/StyledCard';

/* 
TODOS:
Saubere Rahmen
prüfen der 404 route für dashboard
prüfen der sauberen Fehlermeldungen
checken ob es besser ist mit der zeitsignatur das token zu validieren 
router guard prüfen und flackern beim laden. 
sidebar animieren
checkauth prüfen wenn kein token zurückgegeben wird
 */

const Account = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));

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
                    //display: 'flex',
                    //flexDirection: 'column',
                    //width: '100%',
                  }}
                >
                  <Tab
                    data-testid="tab-account"
                    iconPosition="start"
                    icon={<IconUserCircle size="22" />}
                    label="Account"
                    sx={{ color: theme.palette.font.secondary, '&.Mui-selected': { color: 'white' }, minWidth: smDown ? '100%' : 'auto' }}
                  />
                  <Tab
                    iconPosition="start"
                    icon={<IconLock size="22" />}
                    label="Anmeldedaten"
                    sx={{ color: theme.palette.font.secondary, '&.Mui-selected': { color: 'white' }, minWidth: smDown ? '100%' : 'auto' }}
                  />
                </Tabs>
              </Box>

              <Divider />
              <CardContent
                sx={{
                  '&.cardcontent': { backgroundColor: theme.palette.background.main, border: '2px solid', borderColor: theme.palette.border.main, borderRadius: '8px' },
                }}
              >
                <TabPanel value={activeTab} index={0}>
                  <AccountDetails />
                </TabPanel>

                <TabPanel value={activeTab} index={1}>
                  <Credentials />
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
