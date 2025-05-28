import { Box, List, ListSubheader, styled, useTheme } from '@mui/material';

import { sideBarMenuItems } from 'src/config/NavigationConfigurations';

import NavItem from './NavItem';
import NavCollapse from './NavCollapse';

const SidebarMenu = () => {
  const theme = useTheme();

  const ListSubheaderStyled = styled(props => <ListSubheader {...props} />)(({ theme }) => ({
    fontWeight: '700',
    color: theme.palette.font.secondary,
    marginTop: '2.5rem',
    fontSize: '18px',
    backgroundColor: 'transparent',
    padding: '3px 12px',
  }));

  return (
    <Box px={{ xs: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {sideBarMenuItems.map((item, i) => {
          if (item.subheader) {
            return (
              <ListSubheaderStyled sx={{ marginTop: '20px' }} key={item.subheader + i}>
                {item.subheader}
              </ListSubheaderStyled>
            );
          } else if (item.children) {
            return <NavCollapse menu={item} level={1} key={item.title + i} />;
          } else {
            return <NavItem item={item} key={item.title + i} />;
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarMenu;
