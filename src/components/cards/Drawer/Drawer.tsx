import { Box, Divider, Drawer, IconButton, List, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { drawerAtom, userAtom } from '../../../store/store';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';
import { IDrawerItem } from '../../../interfaces/interfaces';
import { DRAWER_ITEMS } from '../../../utils/const';
import DrawerItem from '../../parts/DrawerItem/DrawerItem';
import './Drawer.styles.scss';

const KomAppDrawer = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useAtom(drawerAtom);
  const [user, _setUser] = useAtom(userAtom);
  const toggleClose = (event: React.KeyboardEvent | React.MouseEvent) => {
    console.log('closed drawer', event);
    setDrawerOpen(false);
  };

  const handleListItemClick = (drawerItem: IDrawerItem) => {
    navigate(drawerItem.route);
  };

  const displayDrawerItem = (drawerItem: IDrawerItem) => {
    let shouldDisplay = false;
    if (drawerItem.requiresAuth && user.authenticated) {
      shouldDisplay = true;
    } else if (!drawerItem.requiresAuth && !user.authenticated) {
      shouldDisplay = true;
    }
    if (shouldDisplay) {
      return <DrawerItem key={drawerItem.id} drawerItem={drawerItem} onClick={handleListItemClick} />;
    }
  };

  return (
    <Drawer className='drawer' anchor={'left'} open={drawerOpen} onClose={toggleClose}>
      <Box sx={{ width: 250 }} role='presentation' onClick={toggleClose} onKeyDown={toggleClose}>
        <Box className='drawer__logo'>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div'>
            Komapp
          </Typography>
        </Box>
        <Divider />
        <List>{DRAWER_ITEMS.map((drawerItem: IDrawerItem) => displayDrawerItem(drawerItem))}</List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default KomAppDrawer;
