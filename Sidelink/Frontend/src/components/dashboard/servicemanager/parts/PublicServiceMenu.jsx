import { useState } from 'react';
import { Divider, CardContent, Box, Tab, Tabs, useTheme, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { IconLibraryPlus, IconLibrary } from '@tabler/icons-react';
import TabPanel from 'src/components/dashboard/shared/TabPanel';
import StyledCard from 'src/components/dashboard/shared/StyledCard';
import OverviewPublicServices from './OverviewPublicServices';
import CreatePublicService from './CreatePublicService';

const PublicServiceMenu = ({ type }) => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ maxWidth: '100%' }} component="section">
      <Grid container spacing={3}>
        <Grid size={12}>
          <StyledCard>
            <Box sx={{ position: 'relative', display: 'inline-block', maxWidth: 'calc(100vw - 32px)' }} component="nav">
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
                  iconPosition="start"
                  icon={<IconLibrary size="22" />}
                  label="Übersicht"
                  sx={{ color: theme.palette.font.secondary, '&.Mui-selected': { color: 'white' }, minWidth: smDown ? '100%' : 'auto' }}
                />
                <Tab
                  iconPosition="start"
                  icon={<IconLibraryPlus size="22" />}
                  label={type === 'offer' ? 'Neues Angebot' : 'Neue Suche'}
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
                <OverviewPublicServices type={type} />
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <CreatePublicService type={type} />
              </TabPanel>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicServiceMenu;
