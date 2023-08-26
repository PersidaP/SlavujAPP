import { Box, Button, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './KomAppDialog.styles.scss';
import { IBuyer, IDialogAction, IDialogColumn, IOrder, IProduct, IUser } from '../../../interfaces/interfaces';
import { ReactElement } from 'react';
import classNames from 'classnames';

interface KomAppDialogProps {
  open: boolean;
  onClose: Function;
  dataToDisplay?: IUser | IProduct | IBuyer | IOrder;
  columnsToDisplay?: IDialogColumn[];
  title?: String;
  actions?: IDialogAction[];
  children?: ReactElement;
}

const KomAppDialog = ({ open, onClose, title, dataToDisplay, columnsToDisplay, actions, children }: KomAppDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  const isPrimitive = (inputValue: any) => {
    if (inputValue === Object(inputValue)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Dialog fullScreen={window.screen.width <= 1280} className='komapp-dialog' open={open} onClose={handleClose}>
      <DialogTitle
        className={classNames('komapp-dialog__title', {
          'komapp-dialog__justify__space-between': title,
          'komapp-dialog__justify__flex-end': !title,
        })}
      >
        {title}
        <CloseIcon className='komapp-dialog__close-icon' onClick={handleClose} />
      </DialogTitle>
      <DialogContent className='komapp-dialog__content'>
        {dataToDisplay && actions && !children ? (
          <>
            <Table>
              <TableBody>
                {columnsToDisplay &&
                  columnsToDisplay.map((column: IDialogColumn, index) => {
                    type Key = keyof typeof dataToDisplay;

                    return (
                      <TableRow key={index}>
                        <TableCell>{column.label}</TableCell>
                        <TableCell>
                          {isPrimitive(dataToDisplay[column.columnName as Key]) && dataToDisplay[column.columnName as Key]}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <span style={{ flex: '1 0 auto' }}></span>
            <Box className='komapp-dialog__actions-container'>
              {actions.map((action: IDialogAction, index) => (
                <Button
                  key={index}
                  className=' komapp-dialog__actions-container__button'
                  variant='contained'
                  color={action.color}
                  onClick={() => action.func(dataToDisplay)}
                >
                  {action.name}
                </Button>
              ))}
            </Box>
          </>
        ) : (
          <>{children}</>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default KomAppDialog;
