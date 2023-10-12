import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useAtomValue, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { API } from '../../../api/API';
import { IBuyer, IDialogAction, IPosition, IProduct, ISnackbar, ITableColumn } from '../../../interfaces/interfaces';
import {
  buyersAtom,
  defaultSelectedProduct,
  locationsAtom,
  productsAtom,
  selectedBuyerAtom,
  selectedLocationAtom,
  selectedProductAtom,
} from '../../../store/store';
import { defaultBuyerState, defaultProductState, defaultSnackbarOptions } from '../../../utils/const';
import { IData } from '../../parts/InputAutocomplete/InputAutocomplete';
import BuyerCard from '../BuyerCard/BuyerCard';
import KomAppDialog from '../KomAppDialog/KomAppDialog';
import KomAppTable from '../KomAppTable/KomAppTable';
import ProductsCard from '../ProductsCard/ProductsCard';
import SelectedProductCard from '../SelectedProductCard/SelectedProductCard';
import './AddOrderForm.styles.scss';
import KomAppSnackbar from '../snackbar/snackbar';
import { trackPromise } from 'react-promise-tracker';

const dialogColumns = [
  { columnName: 'productId', label: 'Sifra' },
  { columnName: 'productName', label: 'Naziv' },
  { columnName: 'pricePerUnit', label: 'Cena po komadu' },
  { columnName: 'totalPrice', label: 'Ukupna cena' },
  { columnName: 'productRebate', label: 'Rabat %' },
  { columnName: 'productQty', label: 'Kolicina' },
];

const AddOrderForm = () => {
  const buyers = useAtomValue<Array<IBuyer>>(buyersAtom);
  const products = useAtomValue<Array<IProduct>>(productsAtom);
  const locations = useAtomValue<Array<IBuyer>>(locationsAtom);
  const [selectedBuyer, setSelectedBuyer] = useAtom(selectedBuyerAtom);
  const [selectedLocation, setSelectedLocation] = useAtom(selectedLocationAtom);
  const [selectedProduct, setSelectedProduct] = useAtom(selectedProductAtom);
  const [clearAutocomplete, setClearAutocomplete] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState<ISnackbar>(defaultSnackbarOptions);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [positions, setPositions] = useState<IPosition[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<IProduct>();
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [autocompleteBuyers, setAutocompleteBuyers] = useState<Array<IData>>([]);
  const [autocompleteProducts, setAutocompleteProducts] = useState<Array<IData>>([]);
  const [autocompleteLocations, setAutocompleteLocations] = useState<Array<IData>>([]);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    setAutocompleteBuyers(
      buyers.map((buyer) => {
        return {
          id: buyer.buyerId,
          name: buyer.buyerName,
          vat: buyer.buyerVATCode || '',
        };
      })
    );

    setAutocompleteProducts(
      products.map((product) => {
        return {
          id: product.productId,
          name: product.productName,
        };
      })
    );

    if (Array.isArray(locations) && locations.length) {
      setAutocompleteLocations(
        locations.map((location: IBuyer) => {
          return {
            id: location.buyerId,
            name: location.buyerName,
            vat: location.buyerVATCode || '',
          };
        })
      );
    }
  }, [products, buyers, locations]);

  useEffect(() => {
    if (!selectedBuyer.buyerId) {
      setPositions([]);
    }
    setClearAutocomplete(false);
    if (!selectedProduct.productId || !selectedBuyer.buyerId || !selectedProduct.productQty) {
      setButtonEnabled(false);
    } else {
      setButtonEnabled(true);
    }
  }, [selectedProduct, selectedBuyer]);

  useEffect(() => {
    setSelectedLocation(defaultBuyerState);
    setSelectedProduct(defaultSelectedProduct);
    handleAutocompleteSelected({ id: '', name: '', fullName: '', vat: '' }, 'location', 'clear');
  }, [selectedBuyer.buyerId]);

  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      setSnackbarOptions({
        ...snackbarOptions,
        open: false,
        message: '',
        severity: 'success',
      });
    }, snackbarOptions.timeout);
    return () => {
      clearTimeout(timeoutRef);
    };
  }, [snackbarOptions]);

  const handleAutocompleteSelected = (value: IData, type: 'buyer' | 'product' | 'externalUser' | 'location', reason?: string) => {
    switch (type) {
      case 'location': {
        if (reason === 'clear') {
          setSelectedLocation(defaultBuyerState);
          break;
        }
        if (value?.id!) {
          const foundLocation = locations.find((location: any) => location.buyerId === value.id);
          if (foundLocation) {
            setSelectedLocation({ ...foundLocation });
          }
        }
        break;
      }
      case 'buyer': {
        if (reason === 'clear') {
          setSelectedBuyer(defaultBuyerState);
          break;
        }
        if (value?.id!) {
          const foundBuyer = buyers.find((buyer) => buyer.buyerId === value.id);
          if (foundBuyer) {
            setSelectedBuyer({ ...foundBuyer });
            setPositions([]);
          }
        }
        break;
      }
      case 'product': {
        if (reason === 'clear') {
          setSelectedProduct(defaultProductState);
          break;
        }
        if (value?.id!) {
          const foundProduct = products.find((product) => product.productId === value.id);
          if (foundProduct) {
            setSelectedProduct({ ...foundProduct, productQty: foundProduct.productQty ? foundProduct.productQty : 0 });
          }
        }
        break;
      }
    }
  };

  const positionTableColumns: ITableColumn[] = [
    { columnName: 'productId', label: 'Sifra' },
    { columnName: 'productName', label: 'Naziv' },
    {
      columnName: 'productQty',
      label: 'Kol.',
      isEditable: true,
      onChangeFunc: function (item: IPosition, newAmount: number) {
        item.productQty = newAmount;
        item.totalPrice = newAmount * item.pricePerUnit;

        setPositions([
          ...positions.map((pos: IPosition) => {
            if (pos.productId === item.productId) {
              const newPos = {
                ...item,
                productQty: newAmount,
                totalPrice: +(newAmount * item.pricePerUnit).toFixed(2),
              };
              return newPos;
            } else {
              return pos;
            }
          }),
        ]);
      },
    },
    { columnName: 'pricePerUnit', label: 'Cena' },
    { columnName: 'totalPrice', label: 'Ukupno' },
  ];

  const dialogActions: IDialogAction[] = [
    {
      name: 'Obrisi',
      func: function (item: IProduct) {
        setDialogOpen(false);
        setPositions(positions.filter((pos) => pos.productId !== item.productId));
      },
      color: 'error',
    },
  ];

  const handlePositionTableRowClick = (value: IProduct) => {
    setSelectedPosition(value);
    setDialogOpen(true);
  };

  const handleAddOrder = () => {
    const priceWithRebate = selectedProduct.productRetailPrice * (1 - selectedProduct.productRebate / 100);
    const pricePerUnit = selectedProduct.productRebate ? +priceWithRebate.toFixed(2) : selectedProduct.productRetailPrice;
    const selectedProductPosition: IPosition = {
      ...selectedProduct,
      pricePerUnit: pricePerUnit,
      totalPrice: +(selectedProduct.productQty! * pricePerUnit).toFixed(2),
    };

    setPositions((oldPositions) => {
      if (oldPositions.find((oldPosition) => oldPosition.productId === selectedProductPosition.productId)) {
        return [
          ...oldPositions.map((position) => {
            if (position.productId === selectedProductPosition.productId) {
              const newAmount = position.productQty! + selectedProductPosition.productQty!;
              const newTotalPrice = newAmount * priceWithRebate;
              return { ...position, productQty: newAmount, pricePerUnit: priceWithRebate, totalPrice: +newTotalPrice.toFixed(2) };
            } else {
              return position;
            }
          }),
        ];
      }
      return [...oldPositions, selectedProductPosition];
    });
    setClearAutocomplete(true);
    setSelectedProduct(defaultProductState);
  };

  const handleInput = (e: any) => {
    setComment(e.target.value);
  };

  const handleFinishOrder = async () => {
    const body = {
      orderValue: 10000,
      orderValueVAT: 10,
      orderRebate: 10,
      orderBuyer: selectedBuyer,
      orderProducts: positions,
      orderComment: comment,
    };
    await trackPromise(
      API.OrderApi.createOrder(body)
        .then((data) => {
          setComment('');
          setSnackbarOptions({
            ...snackbarOptions,
            message: 'Uspesno kreiranje porudzbine!',
            open: true,
            severity: 'success',
          });
          setPositions([]);
        })
        .catch((err) => {
          setSnackbarOptions({
            ...snackbarOptions,
            message: 'Doslo je do greske prilikom kreiranja porudzbine!',
            open: true,
            severity: 'error',
          });
        })
    );
  };

  return (
    <div className='add-order-wrapper'>
      <Card className='add-order-form' style={{ minWidth: window.screen.width >= 1280 ? '584px' : '375px' }}>
        <CardContent sx={{ padding: '8px !important' }}>
          <BuyerCard
            key={1}
            autocompleteBuyers={autocompleteBuyers}
            handleAutocompleteSelected={handleAutocompleteSelected}
            label='Kupac'
            type='buyer'
            selected={selectedBuyer}
            setSelected={setSelectedBuyer}
          />
          {locations.length ? (
            <BuyerCard
              key={2}
              autocompleteBuyers={autocompleteLocations}
              handleAutocompleteSelected={handleAutocompleteSelected}
              label='Lokacija'
              type='location'
              selected={selectedLocation}
              setSelected={setSelectedLocation}
            />
          ) : null}
          {locations.length ? (
            selectedLocation.buyerId && selectedBuyer.buyerId ? (
              <div className='add-order-form__product-card'>
                <ProductsCard
                  autocompleteProducts={autocompleteProducts}
                  clear={clearAutocomplete}
                  handleAutocompleteSelected={handleAutocompleteSelected}
                />
                {selectedProduct.productId && (
                  <div className='add-order-form__product-card__selected'>
                    <SelectedProductCard selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
                    <Button
                      variant='contained'
                      color='primary'
                      className='add-order-form__product-card__selected__add-product-button'
                      fullWidth={true}
                      size='small'
                      disabled={!buttonEnabled}
                      onClick={handleAddOrder}
                    >
                      Dodaj proizvod
                    </Button>
                  </div>
                )}
              </div>
            ) : null
          ) : selectedBuyer.buyerId ? (
            <div className='add-order-form__product-card'>
              <ProductsCard
                autocompleteProducts={autocompleteProducts}
                clear={clearAutocomplete}
                handleAutocompleteSelected={handleAutocompleteSelected}
              />
              {selectedProduct.productId && (
                <div className='add-order-form__product-card__selected'>
                  <SelectedProductCard selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
                  <Button
                    variant='contained'
                    color='primary'
                    className='add-order-form__product-card__selected__add-product-button'
                    fullWidth={true}
                    size='small'
                    disabled={!buttonEnabled}
                    onClick={handleAddOrder}
                  >
                    Dodaj proizvod
                  </Button>
                </div>
              )}
            </div>
          ) : null}

          <KomAppDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            dataToDisplay={selectedPosition ? selectedPosition : selectedProduct}
            columnsToDisplay={dialogColumns}
            title={'Detalji proizvoda'}
            actions={dialogActions}
          />
          {selectedBuyer.buyerId && positions.length > 0 && (
            <Card className='add-order-form__order-card'>
              <Typography variant='h6' component='div' align='center'>
                Pregled porudzbine
              </Typography>
              <KomAppTable
                data={positions}
                columnsToDisplay={positionTableColumns}
                onRowClick={(row: IProduct) => handlePositionTableRowClick(row)}
                isDense={true}
              />
              <Typography variant='subtitle1' component='div' align='right' sx={{ width: '100%' }}>
                Ukupno: {positions.reduce((acc, element) => acc + element.totalPrice, 0).toFixed(2)}
              </Typography>
              <div style={{ paddingBottom: '25px' }}></div>
              <Typography variant='subtitle1' component='div' align='center' sx={{ width: '100%' }}>
                <TextField
                  multiline
                  rows={4}
                  className='add-order-form-input__full-width'
                  label='Komentar:'
                  value={comment}
                  onInput={handleInput}
                />
              </Typography>
              <div style={{ paddingBottom: '25px' }}></div>

              <div className='add-order-form__order-card__finish-order-button'>
                <Button
                  variant='contained'
                  color='primary'
                  className='add-order-form__order-card__finish-order-button'
                  fullWidth={true}
                  size='small'
                  disabled={positions.length === 0}
                  onClick={handleFinishOrder}
                >
                  Zavrsi porudzbinu
                </Button>
              </div>
            </Card>
          )}
          <KomAppSnackbar
            {...snackbarOptions}
            // open={openSnackbar}
            // timeout={3000}
            // message={isOrderSuccessful ? 'Uspesno kreiranje porudzbine!' : 'Doslo je do greske prilikom kreiranja porudzbine!'}
            // severity='success'
            // anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddOrderForm;
