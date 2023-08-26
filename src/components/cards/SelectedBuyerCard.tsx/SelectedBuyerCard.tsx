import { IBuyer } from '../../../interfaces/interfaces';
import { Box, Card, CardContent, TextField } from '@mui/material';
import './SelectedBuyerCard.styles.scss';
import { useAtomValue } from 'jotai';
import { themeAtom } from '../../../store/store';

interface SelectedBuyerCardProps {
  selectedBuyer: IBuyer;
}

const SelectedBuyerCard = ({ selectedBuyer }: SelectedBuyerCardProps) => {
  const theme = useAtomValue(themeAtom);

  return (
    <Card className='selected-buyer-form'>
      <CardContent>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { margin: 1 },
            '& .MuiInputLabel-root': {
              color: theme === 'dark' ? 'white' : 'black',
              opacity: 0.8,
            },
            '& .MuiInputBase-root': {
              '& .MuiInputBase-input': {
                WebkitTextFillColor: theme === 'dark' ? 'white' : 'black',
                opacity: 1,
              },
            },
          }}
          noValidate
        >
          <>
            <TextField className='selected-buyer-form__full-width' value={selectedBuyer.buyerName} disabled label='Ime kupca' />
            {selectedBuyer.buyerVATCode && (
              <TextField className='selected-buyer-form__half-width' value={selectedBuyer.buyerVATCode} disabled label='Pib' />
            )}
            {selectedBuyer.buyerAddress && (
              <TextField className='selected-buyer-form__half-width' value={selectedBuyer.buyerAddress} disabled label='Adresa' />
            )}
            {selectedBuyer.buyerEmail && (
              <TextField className='selected-buyer-form__half-width' value={selectedBuyer.buyerEmail} disabled label='Email' />
            )}
            {selectedBuyer.buyerPhone && (
              <TextField className='selected-buyer-form__half-width' value={selectedBuyer.buyerPhone} disabled label='Sifra kupca' />
            )}
            {selectedBuyer.buyerRegistrationNumber && (
              <TextField
                className='selected-buyer-form__half-width'
                disabled
                value={selectedBuyer.buyerRegistrationNumber}
                label='Maticni broj'
              />
            )}
          </>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SelectedBuyerCard;
