import { Card, CardContent } from '@mui/material';
import { selectedProductAtom } from '../../../store/store';
import InputAutocomplete, { IData } from '../../parts/InputAutocomplete/InputAutocomplete';
import { useAtomValue } from 'jotai';

interface ProductsCardProps {
  autocompleteProducts: Array<IData>;
  handleAutocompleteSelected: (_value: IData, _type: 'buyer' | 'product' | 'externalUser') => void;
  clear: boolean;
}
const ProductsCard = ({ autocompleteProducts, handleAutocompleteSelected, clear }: ProductsCardProps) => {
  const selectedProduct = useAtomValue(selectedProductAtom);

  return (
    <Card className='add-order-form__mb-8'>
      <CardContent>
        <InputAutocomplete
          onChange={handleAutocompleteSelected}
          className='add-order-form__mb-8'
          values={autocompleteProducts}
          selectedValue={{ id: selectedProduct.productId, name: selectedProduct.productName }}
          type='product'
          label='Izaberite proizvod'
          clear={clear}
        />
      </CardContent>
    </Card>
  );
};

export default ProductsCard;
