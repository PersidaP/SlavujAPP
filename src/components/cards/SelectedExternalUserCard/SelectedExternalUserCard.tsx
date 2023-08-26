import { IExternalUser } from '../../../interfaces/interfaces';
import { Box, Card, CardContent, TextField } from '@mui/material';
import './SelectedExternalUserCard.styles.scss';

interface SelectedExternalUserCardProps {
  selectedExternalUser: IExternalUser;
}

const SelectedExternalUserCard = ({ selectedExternalUser }: SelectedExternalUserCardProps) => {
  return (
    <Card className='selected-external-user-form'>
      <CardContent>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { margin: 1 },
            '& .MuiInputLabel-root': {
              color: 'black',
              opacity: 0.8,
            },
            '& .Mui-focused': {
              color: 'white',
            },
          }}
          noValidate
        >
          <>
            <TextField className='selected-external-user-form__full-width' value={selectedExternalUser.userFullName} disabled label='Ime' />
            <TextField className='selected-external-user-form__half-width' value={selectedExternalUser.user} disabled label='Korisnik' />
            <TextField
              className='selected-external-user-form__half-width'
              value={selectedExternalUser.userId}
              disabled
              label='Id korisnika'
            />
          </>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SelectedExternalUserCard;
