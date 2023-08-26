import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { ChangeEvent, useEffect, useState } from 'react';
import { IBuyer } from '../../../interfaces/interfaces';
import { buyersAtom } from '../../../store/store';
import KomAppDialog from '../KomAppDialog/KomAppDialog';
import KomAppTable from '../KomAppTable/KomAppTable';
import SearchIcon from '@mui/icons-material/Search';
import '././BuyersView.styles.scss';
import { buyersViewTableColumns } from './BuyersView.data';
import { defaultBuyerState } from '../../../utils/const';

const BuyersView = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedBuyer, setSelectedBuyer] = useState<IBuyer>(defaultBuyerState);
  const [buyers, setBuyers] = useAtom(buyersAtom);
  const [filteredBuyers, setFilteredBuyers] = useState<Array<IBuyer>>(buyers);

  useEffect(() => {
    setFilteredBuyers(buyers);
  }, [buyers, setBuyers]);

  const onRowClick = (buyer: IBuyer) => {
    setSelectedBuyer(buyer);
    setDialogOpen(true);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.currentTarget.value;
    setFilteredBuyers(
      buyers.filter(
        (buyer) =>
          buyer.buyerId.includes(searchText) || buyer.buyerName.toLowerCase().includes(searchText) || buyer.buyerPhone.includes(searchText)
      )
    );
  };

  return (
    <>
      <Box className='buyers-view__container'>
        <Typography variant='h4' className='buyers-view__mb-8'>
          Pretraga kupaca
        </Typography>
        <TextField
          className='buyers-view__mb-8'
          label='Pretraga po id, imenu i telefonu'
          variant='outlined'
          onChange={handleSearchInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position='end'
                sx={{
                  backgroundColor: 'transparent',
                }}
              >
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <KomAppTable data={filteredBuyers} columnsToDisplay={buyersViewTableColumns} onRowClick={onRowClick} />
      </Box>
      <KomAppDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        dataToDisplay={selectedBuyer}
        title={'Detalji kupca'}
        actions={[]}
      />
    </>
  );
};

export default BuyersView;
