import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { API } from '../api/API';
import AddOrderForm from '../components/cards/AddOrderForm/AddOrderForm';
import BuyersView from '../components/cards/BuyersView/BuyersView';
import ProductView from '../components/cards/ProductView/ProductView';
import KomAppSnackbar from '../components/cards/snackbar/snackbar';
import { IBuyer, IProduct, IResponse, ISnackbar } from '../interfaces/interfaces';
import { buyersAtom, productsAtom } from '../store/store';
import { defaultSnackbarOptions } from '../utils/const';
import { trackPromise } from 'react-promise-tracker';

const OrderPage = () => {
  const [_, setProducts] = useAtom(productsAtom);
  const [_buyers, setBuyers] = useAtom(buyersAtom);
  const [snackbarOptions, setSnackbarOptions] = useState<ISnackbar>(defaultSnackbarOptions);

  useEffect(() => {
    const fetchProducts = async () => {
      const res: Partial<IResponse> | null | undefined = await trackPromise(API.ProductApi.getAllProducts());
      if (!res) {
        return setSnackbarOptions({
          ...snackbarOptions,
          message: 'Greska u komunikaciji sa serverom',
          open: true,
          severity: 'error',
        });
      }
      const { error, data } = res;
      if (error) {
        return setSnackbarOptions({
          ...snackbarOptions,
          message: `${error}`,
          open: true,
          severity: 'error',
        });
      }
      if (data && !error) {
        setProducts(data as Array<IProduct>);
      }
    };
    const fetchBuyers = async () => {
      const res: Partial<IResponse> | null | undefined = await trackPromise(API.BuyerApi.getUserBuyers());
      if (!res) {
        return setSnackbarOptions({
          ...snackbarOptions,
          message: 'Greska u komunikaciji sa serverom',
          open: true,
          severity: 'error',
        });
      }
      const { error, data } = res;
      if (error) {
        return setSnackbarOptions({
          ...snackbarOptions,
          message: `${error}`,
          open: true,
          severity: 'error',
        });
      }
      if (data && !error) {
        setBuyers(data as Array<IBuyer>);
      }
    };
    fetchProducts();
    fetchBuyers();
  }, [setProducts, setBuyers, snackbarOptions]);

  return (
    <>
      <AddOrderForm />
      <ProductView />
      <BuyersView />
      <KomAppSnackbar {...snackbarOptions} />
    </>
  );
};

export default OrderPage;
