import { Grid } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { API } from '../../api/API';
import AddOrderForm from '../../components/cards/AddOrderForm/AddOrderForm';
import { IBuyer, IProduct, IResponse } from '../../interfaces/interfaces';
import { buyersAtom, productsAtom, selectedBuyerAtom } from '../../store/store';
import './OrderPage.styles.scss';
import { trackPromise } from 'react-promise-tracker';

const OrderPage = () => {
  const [_, setProducts] = useAtom(productsAtom);
  const [_buyers, setBuyers] = useAtom(buyersAtom);
  const selectedBuyer = useAtomValue(selectedBuyerAtom);

  useEffect(() => {
    const fetchBuyers = async () => {
      const res: Partial<IResponse> | null | undefined = await trackPromise(API.BuyerApi.getUserBuyers());
      if (!res) {
        return console.error('Error, could not reach the server while fetching buyers.');
      }
      const { error, data } = res;
      if (error) {
        return console.error('Error while fetching buyers.', error);
      }
      if (data && !error) {
        setBuyers(data as Array<IBuyer>);
      }
    };
    fetchBuyers();
  }, [setBuyers]);


  useEffect(() => {
    if (selectedBuyer) {
      const fetchProducts = async () => {
      const res: Partial<IResponse> | null | undefined = await trackPromise(API.ProductApi.getAllProducts(selectedBuyer.buyerId));
      if (!res) {
        return console.error('Error, could not reach the server while fetching products.');
      }
      const { error, data } = res;
      if (error) {
        return console.error('Error while fetching products.', error);
      }
      if (data && !error) {
        const products = (data as Array<IProduct>).map((prod: IProduct) => {
          return {
            ...prod,
            productName: prod.productName.replace(prod.productId, ''),
          };
        });
        setProducts(products);
      }
    };
    fetchProducts();

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedBuyer])

  return (
    <Grid className='orderPage__grid' container spacing={2}>
      <Grid className='orderPage__grid__item' item xs={12} sm={12} md={12} lg={12} xl={12}>
        <AddOrderForm />
      </Grid>
    </Grid>
  );
};

export default OrderPage;
