import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { ChangeEvent, useEffect, useState } from 'react';
import { IOrder, IProduct } from '../../../interfaces/interfaces';
import { productsAtom } from '../../../store/store';
import { defaultOrderState } from '../../../utils/const';
import KomAppDialog from '../KomAppDialog/KomAppDialog';
import KomAppTable from '../KomAppTable/KomAppTable';
import '././ProductView.styles.scss';
import { productViewTableColumns } from './ProductView.data';

const ProductView = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder>(defaultOrderState);
  const [products, setProducts] = useAtom(productsAtom);
  const [filteredProducts, setFilteredProducts] = useState<Array<IProduct>>(products);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.currentTarget.value;
    setFilteredProducts(
      products.filter(
        (product) =>
          product.productName.includes(searchText) ||
          product.productId.includes(searchText) ||
          product.productPrice.toString().includes(searchText)
      )
    );
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products, setProducts]);

  const onRowClick = (order: IOrder) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  return (
    <>
      <Box className='product-view__container'>
        <Typography variant='h4' className='product-view__mb-8'>
          Pretraga proizvoda
        </Typography>
        <TextField
          className='product-view__text-field'
          label='Pretraga po id, nazivu i ceni'
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
        <KomAppTable data={filteredProducts} columnsToDisplay={productViewTableColumns} onRowClick={onRowClick} isDense={true} />
      </Box>
      <KomAppDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        dataToDisplay={selectedOrder}
        title={'Detalji proizvoda'}
        actions={[]}
      />
    </>
  );
};

export default ProductView;
