import { IProduct, ITableColumn } from '../../../interfaces/interfaces';
import KomAppTable from '../KomAppTable/KomAppTable';

interface SelectedHistoryCardProps {
  orderPositions: IProduct[];
  orderId: number;
}

const SelectedHistoryCard = ({ orderPositions, orderId }: SelectedHistoryCardProps) => {
  const data = orderPositions.map((product) => {
    return { ...product, totalPrice: (product.productQty! * product.productPrice!).toFixed(2), orderId: orderId };
  });

  const positionTableColumns: ITableColumn[] = [
    { columnName: 'productId', label: 'Sifra' },
    { columnName: 'productName', label: 'Naziv' },
    { columnName: 'totalPrice', label: 'Ukupna cena' },
    { columnName: 'productRebate', label: 'Rabat' },
  ];

  return (
    <>
      {data.length > 0 ? (
        <KomAppTable data={data} columnsToDisplay={positionTableColumns} isDense={true} />
      ) : (
        <div style={{ justifyContent: 'center' }}>Nema proizvoda</div>
      )}
    </>
  );
};

export default SelectedHistoryCard;
