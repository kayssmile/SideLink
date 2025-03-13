import { Box, List, ListSubheader, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Menuitems from './MenuItems';
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';


const SidebarItems = () => {
  const theme = useTheme();

  const ListSubheaderStyle = styled(props => <ListSubheader {...props} />)(({ theme }) => ({
    fontWeight: '700',
    color: theme.palette.font.secondary,
    marginTop: '2.5rem',
    fontSize: '18px',
    backgroundColor: 'transparent',
    padding: '3px 12px',
  }));

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          if (item.subheader) {

            return <ListSubheaderStyle>{item.subheader}</ListSubheaderStyle>;

          } else if (item.children) {

            return <NavCollapse menu={item} level={1} key={item.id} />;

          } else {

            return <NavItem item={item} key={item.id} />;

          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
