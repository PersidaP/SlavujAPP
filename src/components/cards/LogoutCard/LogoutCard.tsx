import { Button, Typography } from '@mui/material';
import './LogoutCard.styles.scss';

interface LogoutCardProps {
  onSubmit: Function;
  onClose: Function;
}

const LogoutCard = ({ onSubmit, onClose }: LogoutCardProps) => (
  <div className='logout-card'>
    <Typography variant='h4' component='div' align='center'>
      Da li ste sigurni da zelite da se izlogujete?
    </Typography>
    <span style={{ flex: '1' }}></span>
    <div className='logout-card__buttons-container'>
      <Button variant='contained' color='warning' className='logout-card__buttons-container__button' size='small' onClick={() => onClose()}>
        Odustani
      </Button>
      <Button
        variant='contained'
        color='primary'
        className='logout-card__buttons-container__button'
        size='small'
        onClick={() => onSubmit()}
      >
        Potvrdi
      </Button>
    </div>
  </div>
);

export default LogoutCard;
