import React from 'react';
import { useState } from 'react';
import { ListItemIcon, ListItem, Collapse, styled, ListItemText, useTheme } from '@mui/material';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import NavItem from './NavItem';

const NavCollapse = ({ menu, level }) => {
  const Icon = menu.icon;
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const menuIcon = level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.3rem" />;
  console.log(menu);
  const handleCollapse = () => {
    setOpen(!open);
  };

  const ListItemStyled = styled(ListItem)(() => ({
    marginBottom: '2px',
    cursor: 'pointer',
    paddingLeft: '10px',
    backgroundColor: open ? theme.palette.background.primary : 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.background.primary,
      color: theme.palette.background.secondary,
    },
    color: theme.palette.font.secondary,
    borderRadius: `10px`,
  }));

  return (
    <React.Fragment key={menu.title}>
      <ListItemStyled button="true" component="li" onClick={handleCollapse}>
        <ListItemIcon
          sx={{
            minWidth: '36px',
            color: 'inherit',
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText color="inherit">{menu.title}</ListItemText>
        {!open ? <IconChevronDown size="1rem" /> : <IconChevronUp size="1rem" />}
      </ListItemStyled>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {menu.children?.map((item, i) => {
          return <NavItem key={item.title + i} item={item} level={level + 1} />;
        })}
      </Collapse>
    </React.Fragment>
  );
};

export default NavCollapse;
