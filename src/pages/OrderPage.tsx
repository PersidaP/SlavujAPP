import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { API } from '../api/API';
import AddOrderForm from '../components/cards/AddOrderForm/AddOrderForm';
import BuyersView from '../components/cards/BuyersView/BuyersView';
import ProductView from '../components/cards/ProductView/ProductView';
import KomAppSnackbar from '../components/cards/snackbar/snackbar';
import { IBuyer, IProduct, IResponse, ISnackbar } from '../interfaces/interfaces';
import { buyersAtom, locationsAtom, productsAtom, selectedBuyerAtom } from '../store/store';
import { defaultSnackbarOptions } from '../utils/const';
import { trackPromise } from 'react-promise-tracker';

const OrderPage = () => {
  const [_products, setProducts] = useAtom(productsAtom);
  const [_buyers, setBuyers] = useAtom(buyersAtom);
  const [_locations, setLocations] = useAtom(locationsAtom);
  const [snackbarOptions, setSnackbarOptions] = useState<ISnackbar>(defaultSnackbarOptions);
  const selectedBuyer = useAtomValue(selectedBuyerAtom);

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

  const fetchLocations = async (buyerId: string) => {
    const res: Partial<IResponse> | null | undefined = await trackPromise(API.BuyerApi.getPayers(buyerId));
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
      setLocations(data as Array<IBuyer>);
    }
  };

  const fetchProducts = async (buyerId: string) => {
    const res: Partial<IResponse> | null | undefined = await trackPromise(API.ProductApi.getAllProducts(buyerId));
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

  useEffect(() => {
    fetchBuyers();
  }, []);

  useEffect(() => {
    if (selectedBuyer.buyerId) {
      fetchProducts(selectedBuyer.buyerId);
      fetchLocations(selectedBuyer.buyerId);
    } else {
      setProducts([]);
      setLocations([]);
    }
  }, [selectedBuyer]);

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
