import { IProduct } from '../../../interfaces/interfaces';
import { Box, Card, CardContent, TextField } from '@mui/material';
import './SelectedProductCard.styles.scss';
import { Dispatch, SetStateAction } from 'react';
import { useAtomValue } from 'jotai';
import { themeAtom } from '../../../store/store';

interface SelectedProductCardProps {
  selectedProduct: IProduct;
  setSelectedProduct: Dispatch<SetStateAction<IProduct>>;
}

const SelectedProductCard = ({ selectedProduct, setSelectedProduct }: SelectedProductCardProps) => {
  const theme = useAtomValue(themeAtom);
  return (
    <Card className='selected-product-form'>
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
            <TextField className='selected-buyer-form__full-width' label='Naziv proizvoda' disabled value={selectedProduct.productName} />
            {selectedProduct.productPrice && (
              <TextField
                className='selected-buyer-form__half-width'
                label='Cena bez poreza'
                disabled
                value={`${selectedProduct.productPrice} RSD`}
              />
            )}
            <TextField className='selected-buyer-form__half-width' disabled value={`${selectedProduct.productVAT}%`} label='Porez' />
            <TextField
              className='selected-buyer-form__half-width'
              label='Cena sa porezom'
              disabled
              value={`${selectedProduct.productRetailPrice} RSD`}
            />
            <TextField className='selected-buyer-form__half-width' label='Sifra poreza' disabled value={selectedProduct.productVATCode} />

            <TextField
              className='selected-buyer-form__half-width'
              type='number'
              label='Rabat % * '
              value={selectedProduct.productRebate.toString()}
              onChange={(e) =>
                setSelectedProduct((product) => {
                  return { ...product, productRebate: +e.target.value < 0 ? 0 : +e.target.value };
                })
              }
            />
            <TextField
              className='selected-buyer-form__half-width'
              type='number'
              label='Kolicina *'
              value={selectedProduct.productQty?.toString()}
              onChange={(e) =>
                setSelectedProduct((product) => {
                  return { ...product, productQty: +e.target.value < 0 ? 0 : +e.target.value };
                })
              }
            />
          </>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SelectedProductCard;
