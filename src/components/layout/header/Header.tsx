import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import './header.styles.scss';
import { useAtom } from 'jotai';
import { defaultUserState, drawerAtom, selectedBuyerAtom, themeAtom, userAtom } from '../../../store/store';
import ToggleThemeButton from '../../parts/ToogleThemeButton';
import { useState } from 'react';
import KomAppDialog from '../../cards/KomAppDialog/KomAppDialog';
import LogoutCard from '../../cards/LogoutCard/LogoutCard';
import { defaultBuyerState } from '../../../utils/const';

const Header = () => {
  const [_drawerOpen, setDrawerOpen] = useAtom(drawerAtom);
  const [user, setUser] = useAtom(userAtom);
  const [, setSelectedBuyer] = useAtom(selectedBuyerAtom);

  const navigate = useNavigate();
  const [mode, setMode] = useAtom(themeAtom);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMenuClick = () => {
    setDrawerOpen(true);
  };
  const handleLogoutClick = () => {
    sessionStorage.clear();
    setDialogOpen(false);
    setUser(defaultUserState);
    setSelectedBuyer(defaultBuyerState);
    navigate('/login');
  };

  const handleModeChange = (event: React.MouseEvent<HTMLElement>, newMode: 'light' | 'dark') => {
    setMode(newMode);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' style={{ paddingRight: '0' }}>
        <Toolbar style={{ paddingRight: '0' }}>
          {user.roleId && ![1, 2].includes(user.roleId) && (
            <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Komapp
          </Typography>
          <ToggleThemeButton mode={mode} onChange={handleModeChange} />
          {user.authenticated && (
            <IconButton size='large' aria-label='menu' sx={{ mr: 2 }} onClick={() => setDialogOpen(true)} style={{ marginRight: '0' }}>
              <LogoutIcon htmlColor='white' />
            </IconButton>
          )}
          <KomAppDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <LogoutCard onSubmit={handleLogoutClick} onClose={() => setDialogOpen(false)} />
          </KomAppDialog>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
