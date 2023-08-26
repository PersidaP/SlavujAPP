import { Alert, Snackbar } from '@mui/material';
import { ISnackbar } from '../../../interfaces/interfaces';

const KomAppSnackbar = ({ message, timeout, open, severity, anchorOrigin }: ISnackbar) => (
  <Snackbar open={open} autoHideDuration={timeout} anchorOrigin={anchorOrigin}>
    <Alert severity={severity}>{message}</Alert>
  </Snackbar>
);

export default KomAppSnackbar;
