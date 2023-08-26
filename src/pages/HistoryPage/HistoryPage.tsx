import { Grid } from '@mui/material';
import HistoryCard from '../../components/cards/HistoryCard/HistoryCard';
import './HistoryPage.styles.scss';

const HistoryPage = () => {
  return (
    <Grid className='historyPage__grid' container spacing={2}>
      <Grid className='historyPage__grid__item' item xs={12} sm={12} md={12} lg={12} xl={12}>
        <HistoryCard />
      </Grid>
    </Grid>
  );
};

export default HistoryPage;
