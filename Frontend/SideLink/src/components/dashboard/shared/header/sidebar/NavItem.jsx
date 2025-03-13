import { NavLink } from 'react-router';
import { ListItemIcon, ListItem, List, styled, ListItemText, useTheme } from '@mui/material';

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const Icon = item.icon;
  const itemIcon = level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.3rem" />;

  const ListItemStyled = styled(ListItem)(() => ({
    marginBottom: '2px',
    padding: '8px 10px',
    paddingLeft: level >= 2 ? `${level * 15}px` : '10px',
    borderRadius: `10px`,
    color: theme.palette.font.secondary,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.background.primary,
      color: theme.palette.background.secondary,
    },
    '&.active': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },
  }));

  return (
    <List component="li" key={item.id}>
      <ListItemStyled button="true" component={NavLink} to={item.to}>
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color: level > 1 ? `${theme.palette.primary.main}!important` : 'inherit',
          }}
        >
          {itemIcon}
        </ListItemIcon>

        <ListItemText>{item.title}</ListItemText>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
