import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import KomAppDrawer from './components/cards/Drawer/Drawer';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import Main from './components/layout/main/Main';
import LoginPage from './pages/loginpage/LoginPage';
import './styles.scss';
import { useEffect, useMemo } from 'react';
import OrderPage from './pages/OrderPage/OrderPage';
import { AdminRouteWrapper, UserRouteWrapper } from './utils/RouteGuard';
import InvoicePage from './pages/InvoicePage';
import AdminPage from './pages/AdminPage/AdminPage';
import { useAtom, useAtomValue } from 'jotai';
import { defaultUserState, themeAtom, userAtom } from './store/store';
import ReportsPage from './pages/ReportsPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import { ThemeProvider, createTheme } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import classNames from 'classnames';
import Loader from './components/blocks/Loader/Loader';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [_users, setUser] = useAtom(userAtom);
  const mode = useAtomValue(themeAtom);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/login');
    }
    if (location.pathname === '/login') {
      sessionStorage.clear();
      setUser(defaultUserState);
    }
  }, [location.pathname, navigate, setUser]);

  const getDesignTokens = (mode: 'dark' | 'light') => ({
    palette: {
      mode,
      warning: {
        main: '#d32f2f',
      },
      ...(mode === 'light'
        ? {
            primary: {
              main: blue[500],
              light: blue[500],
              dark: blue[700],
            },
            text: {
              primary: grey[900],
              secondary: grey[500],
            },
          }
        : {
            primary: {
              main: '#fff',
              light: grey[300],
              dark: grey[500],
            },
            text: {
              primary: '#fff',
              secondary: grey[400],
            },
            background: {
              default: grey[900],
              paper: grey[900],
            },
          }),
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box className={classNames('layout-container', { dark: mode === 'dark', light: mode === 'light' })}>
          <div className='layout-container__header'>
            <Header />
          </div>
          <div className='layout-container__main'>
            <Main>
              <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route
                  path='/order'
                  element={
                    <UserRouteWrapper>
                      <OrderPage />
                    </UserRouteWrapper>
                  }
                />
                <Route
                  path='/invoice'
                  element={
                    <UserRouteWrapper>
                      <InvoicePage />
                    </UserRouteWrapper>
                  }
                />
                <Route
                  path='/report'
                  element={
                    <UserRouteWrapper>
                      <ReportsPage />
                    </UserRouteWrapper>
                  }
                />
                <Route
                  path='/history'
                  element={
                    <UserRouteWrapper>
                      <HistoryPage />
                    </UserRouteWrapper>
                  }
                />
                <Route
                  path='/admin'
                  element={
                    <AdminRouteWrapper>
                      <AdminPage />
                    </AdminRouteWrapper>
                  }
                />
              </Routes>
            </Main>
          </div>
          <div className='layout-container__footer'>
            <Footer></Footer>
          </div>
        </Box>
      </ThemeProvider>
      <KomAppDrawer />
      <Loader />
    </>
  );
}

export default App;
