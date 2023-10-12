import { Button, Typography } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';
import { IBuyer, ITableAction, ITableColumn } from '../../../interfaces/interfaces';
import { buyersAtom, selectedBuyerAtom, selectedBuyersAtom } from '../../../store/store';
import { defaultBuyerState } from '../../../utils/const';
import { IData } from '../../parts/InputAutocomplete/InputAutocomplete';
import BuyerCard from '../BuyerCard/BuyerCard';
import KomAppTable from '../KomAppTable/KomAppTable';
import './SelectBuyersCard.styles.scss';

const columnsToDisplay: ITableColumn[] = [
  { columnName: 'buyerId', label: 'Id' },
  { columnName: 'buyerName', label: 'Ime' },
];

const SelectBuyersCard = () => {
  const buyers = useAtomValue<Array<IBuyer>>(buyersAtom);
  const [selectedBuyers, setSelectedBuyers] = useAtom(selectedBuyersAtom);
  const [selectedBuyer, setSelectedBuyer] = useAtom(selectedBuyerAtom);
  const [autocompleteBuyers, setAutocompleteBuyers] = useState<Array<IData>>([]);

  useEffect(() => {
    setAutocompleteBuyers(
      buyers.map((buyer: IBuyer) => {
        return {
          id: buyer.buyerId,
          name: buyer.buyerName,
          vat: buyer.buyerVATCode || '',
        };
      })
    );
  }, [buyers]);

  const handleAddBuyer = () => {
    const foundBuyer = selectedBuyers.find((buyer) => buyer.buyerId === selectedBuyer.buyerId);
    if (!foundBuyer) {
      setSelectedBuyers([...selectedBuyers, selectedBuyer]);
    }
  };

  const handleRemoveBuyer = (item: IBuyer) => {
    setSelectedBuyers(selectedBuyers.filter((buyer) => buyer.buyerId !== item.buyerId));
  };

  const handleAutocompleteSelected = (value: IData, type: 'buyer' | 'product' | 'externalUser' | 'location', reason?: string) => {
    switch (type) {
      case 'buyer': {
        if (reason === 'clear') {
          setSelectedBuyer(defaultBuyerState);
          break;
        }
        if (value?.id!) {
          const foundBuyer = buyers.find((buyer) => buyer.buyerId === value.id);
          if (foundBuyer) {
            setSelectedBuyer(foundBuyer);
          }
        }
        break;
      }
    }
  };

  return (
    <div>
      <Typography variant='subtitle1' component='div'>
        Korisnikovi kupci
      </Typography>
      <KomAppTable
        data={selectedBuyers}
        columnsToDisplay={columnsToDisplay}
        noDataMessage='Korisnik nema dodeljene kupce'
        isDense={true}
        className='add-user-form__mb-8'
        actions={
          [
            {
              label: 'Obrisi',
              func: function (item: IBuyer) {
                handleRemoveBuyer(item);
              },
              color: 'error',
              getIsDisabled: () => false,
            },
          ] as Array<ITableAction>
        }
      />
      <BuyerCard
        autocompleteBuyers={autocompleteBuyers}
        handleAutocompleteSelected={handleAutocompleteSelected}
        label='Kupac'
        type='buyer'
        selected={selectedBuyer}
        setSelected={setSelectedBuyer}
      />
      <Button
        className='select-buyers-card__mt-5'
        fullWidth={true}
        type='button'
        variant='contained'
        color='primary'
        size='small'
        onClick={handleAddBuyer}
        disabled={!selectedBuyer.buyerId}
      >
        Dodaj kupca
      </Button>
    </div>
  );
};

export default SelectBuyersCard;
