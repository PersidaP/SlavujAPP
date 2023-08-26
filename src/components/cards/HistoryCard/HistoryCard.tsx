import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { API } from '../../../api/API';
import { IOrderFilters, IOrderModel } from '../../../interfaces/interfaces';
import SelectedHistoryCard from '../SelectedHistoryCard/SelectedHistoryCard';
import './HistoryCard.styles.scss';
import HistoryAccordionCard from '../HistoryAccordionCard/HistoryAccordionCard';
import { trackPromise } from 'react-promise-tracker';

const HistoryCard = () => {
  const [data, setData] = useState<Array<IOrderModel> | null>();
  const [filters, setFilters] = useState<IOrderFilters>();

  const getData = async () => {
    await trackPromise(
      API.OrderApi.getFilteredOrders({ buyerId: filters?.buyerId, dateTo: filters?.dateTo, dateFrom: filters?.dateFrom }).then((data) => {
        setData(data);
      })
    );
  };

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderAccordion = () => {
    if (data && data?.length > 0) {
      return data?.map((history, index) => (
        <Accordion
          className='history-card__accordion'
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          key={history.orderId}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}a-content`} id={`panel${index}a-header`}>
            <HistoryAccordionCard history={history} />
          </AccordionSummary>
          <AccordionDetails>
            <SelectedHistoryCard orderPositions={history.products} orderId={+history.orderId} />
          </AccordionDetails>
        </Accordion>
      ));
    }
    return <Typography>{filters ? 'Nema porudzbina' : ''}</Typography>;
  };

  return (
    <Card>
      <CardContent>
        <Box
          component='form'
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            getData();
            const target = e.target as HTMLFormElement; // type assertion
            setFilters({
              buyerId: target.buyerId.value,
              dateFrom: target.dateFrom.value,
              dateTo: target.dateTo.value,
            });
          }}
        >
          <div className='history-card-form'>
            <TextField className='history-card-form__half-width' name='buyerId' label='Sifra kupca' />
            <TextField className='history-card-form__half-width' name='dateFrom' label='Datum od' placeholder='YYYY-MM-DD' />
            <TextField className='history-card-form__half-width' name='dateTo' label='Datum do' placeholder='YYYY-MM-DD' />
            <Button className='history-card-form__button' type='submit' variant='contained'>
              Trazi
            </Button>
          </div>
        </Box>
        {renderAccordion()}
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
