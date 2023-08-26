import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IOrder } from '../../../interfaces/interfaces';
import { mockedOrders } from '../../../utils/fakedata';

interface OrderTableProps {
  onRowClick: Function;
}

// TODO: this is a placeholder table... replace with a dynamic table
// when implemented
const OrderTable = ({ onRowClick }: OrderTableProps) => {
  const handleTableRowClick = (order: IOrder) => {
    onRowClick(order);
  };

  return (
    <>
      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Order id</TableCell>
              <TableCell>Order value</TableCell>
              <TableCell>Order VAT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockedOrders.map((order: IOrder) => (
              <TableRow onClick={() => handleTableRowClick(order)} key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.orderValue}</TableCell>
                <TableCell>{order.orderValueVAT}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderTable;
