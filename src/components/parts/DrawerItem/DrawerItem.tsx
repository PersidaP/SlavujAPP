import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { IDrawerItem } from '../../../interfaces/interfaces';

interface DrawerItemProps {
  drawerItem: IDrawerItem;
  onClick: Function;
}

const DrawerItem = ({ drawerItem, onClick }: DrawerItemProps) => {
  return (
    <ListItem key={drawerItem.label} disablePadding onClick={() => onClick(drawerItem)}>
      <ListItemButton>
        <ListItemIcon>{drawerItem.icon}</ListItemIcon>
        <ListItemText primary={drawerItem.label} />
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerItem;
