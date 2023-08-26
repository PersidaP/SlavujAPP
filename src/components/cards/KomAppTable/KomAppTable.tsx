import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { ITableAction, ITableColumn } from '../../../interfaces/interfaces';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

import './KomAppTable.styles.scss';
import classNames from 'classnames';

interface KomAppTableProps {
  data: object[];
  columnsToDisplay: ITableColumn[];
  onRowClick?: Function;
  isDense?: boolean;
  actions?: ITableAction[];
  className?: string;
  noDataMessage?: string;
}

const truncate = (text: string, length: number) => {
  return (text as string).substring(0, length) + '...';
};

const shouldTruncate = (text: any, length: number) => {
  return typeof text === 'string' && text.length > length;
};

const truncateLength = 21;

const KomAppTable = ({ data, columnsToDisplay, onRowClick, isDense, actions, className, noDataMessage }: KomAppTableProps) => {
  const handleEditableChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, col: ITableColumn, item: object) => {
    const newVal = +e.target.value < 0 ? '0' : e.target.value;
    if (col.onChangeFunc) {
      col.onChangeFunc(item, parseInt(newVal));
    }
  };

  const handleActionOnClick = (e: React.MouseEvent<HTMLButtonElement>, item: object, actionFunc: Function) => {
    e.stopPropagation();
    actionFunc(item);
  };

  function formatValue(val: object) {
    if (typeof val === 'string' && shouldTruncate(val, truncateLength)) {
      return truncate(val, truncateLength);
    } else if (typeof val === 'boolean') {
      return val ? (
        <CancelIcon className='kom-app-table__cancel-icon' />
      ) : (
        <CheckCircleOutlineIcon className='kom-app-table__checkmark-icon' />
      );
    } else {
      return val;
    }
  }

  return (
    <TableContainer component={Paper} className={`${className} kom-app-table__container`}>
      <Table stickyHeader size={isDense ? 'small' : 'medium'}>
        <TableHead>
          <TableRow>
            {columnsToDisplay.map((field, index) => (
              <TableCell
                className={classNames('kom-app-table__right', {
                  'kom-app-table__left': index === 0 || index === 1,
                  'kom-app-table__cell-dense': isDense,
                })}
                key={index}
              >
                {field.label}
              </TableCell>
            ))}
            {actions && actions.length && <TableCell className={isDense ? 'kom-app-table__cell-dense' : ''}>Akcije</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length ? (
            data.map((item, index) => {
              return (
                <TableRow key={index} {...(onRowClick ? { onClick: () => onRowClick(item) } : {})}>
                  {columnsToDisplay.map((column: ITableColumn, fieldIndex) => {
                    type Key = keyof typeof item;
                    return (
                      <TableCell
                        className={classNames('kom-app-table__right', {
                          'kom-app-table__left': fieldIndex === 0 || fieldIndex === 1,
                          'kom-app-table__cell-dense': isDense,
                        })}
                        key={fieldIndex}
                      >
                        {column.isEditable ? (
                          <TextField
                            onChange={(e) => handleEditableChanged(e, column, item)}
                            onClick={(e) => e.stopPropagation()}
                            inputProps={{
                              style: {
                                fontSize: '12px',
                                padding: '5px',
                                margin: '0px',
                              },
                            }}
                            size='small'
                            className='kom-app-table__editable'
                            type='number'
                            value={item[column.columnName as Key]}
                          />
                        ) : (
                          <>{formatValue(item[column.columnName as Key])}</>
                        )}
                      </TableCell>
                    );
                  })}
                  {actions && actions.length && (
                    <TableCell className={isDense ? 'kom-app-table__cell-dense' : ''}>
                      {actions.map((action) => {
                        return (
                          <Button
                            key={action.label}
                            disabled={action.getIsDisabled()}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                              handleActionOnClick(e, item, action.func);
                            }}
                            variant='contained'
                            color={action.color}
                            size={isDense ? 'small' : 'medium'}
                          >
                            {action.label}
                          </Button>
                        );
                      })}
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell align='center' colSpan={columnsToDisplay.length + (actions ? actions.length : 0)}>
                {noDataMessage ? noDataMessage : <>No data to display</>}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KomAppTable;
