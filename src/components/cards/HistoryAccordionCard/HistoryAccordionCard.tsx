import { IOrderModel } from '../../../interfaces/interfaces';
import { Box, TextField } from '@mui/material';
import './HistoryAccordionCard.styles.scss';
import { useAtomValue } from 'jotai';
import { themeAtom } from '../../../store/store';

interface HistoryAccordionCardProps {
  history: IOrderModel;
}

const HistoryAccordionCard = ({ history }: HistoryAccordionCardProps) => {
  const theme = useAtomValue(themeAtom);
  const date = new Date(history.orderDate);
  const monthNames = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Octobar', 'Novembar', 'Decembar'];

  return (
    <Box
      component='form'
      className='history-accordion-form'
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
        <TextField className='history-accordion-form__half-width' value={history.orderId} disabled label='Sifra porudzbine' />
        <TextField className='history-accordion-form__half-width' value={history.orderBuyerId} disabled label='Sifra kupca' />
        <TextField
          className='history-accordion-form__half-width'
          value={date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear()}
          disabled
          label='Datum porudzbine'
        />
        <TextField
          className='history-accordion-form__half-width'
          value={(history.orderValue + history.orderValueVAT).toFixed(2) + ' RSD'}
          disabled
          label='Ukupno za platiti'
        />
      </>
    </Box>
  );
};

export default HistoryAccordionCard;
