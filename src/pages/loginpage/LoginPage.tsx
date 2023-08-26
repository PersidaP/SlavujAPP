import { Box } from '@mui/material';
import LoginCard from '../../components/cards/LoginCard/LoginCard';
import './LoginPage.styles.scss';

const LoginPage = () => {
  return (
    <Box className='loginPage-container'>
      <LoginCard />
    </Box>
  );
};

export default LoginPage;
