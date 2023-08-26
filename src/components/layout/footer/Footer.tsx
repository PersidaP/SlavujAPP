import { Card, Typography } from '@mui/material';
import './footer.styles.scss';

const Footer = () => {
  return (
    <Card raised={true} className='footer'>
      <Typography variant='subtitle2' fontWeight={100} align={'center'}>
        All rights reserved blabla bla
      </Typography>
    </Card>
  );
};

export default Footer;
