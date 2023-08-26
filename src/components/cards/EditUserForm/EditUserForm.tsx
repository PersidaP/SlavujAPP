import { Button, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { IBuyer, IResponse, ISnackbar, IUser, IUserBuyers, IUserInfo } from '../../../interfaces/interfaces';
import { selectedBuyersAtom } from '../../../store/store';
import KomAppSnackbar from '../snackbar/snackbar';
import { defaultSnackbarOptions } from '../../../utils/const';
import '././EditUserForm.styles.scss';
import { API } from '../../../api/API';
import { Box } from '@mui/system';
import { useAtom } from 'jotai';
import SelectBuyersCard from '../SelectBuyersCard/SelectBuyersCard';
import { trackPromise } from 'react-promise-tracker';

interface EditUserFormProps {
  selectedUser: Partial<IUser>;
}

const EditUserForm = ({ selectedUser }: EditUserFormProps) => {
  const [allSelectedBuyers, setAllSelectedBuyers] = useAtom(selectedBuyersAtom);
  const [snackbarOptions, setSnackbarOptions] = useState<ISnackbar>(defaultSnackbarOptions);

  useEffect(() => {
    if (selectedUser && selectedUser.buyers) {
    }
    const fetchUserBuyers = async () => {
      const res: Partial<IResponse> | null | undefined = await trackPromise(API.BuyerApi.getUserBuyers(selectedUser.username));
      if (!res) {
        return console.error('Error, could not reach the server while fetching user buyers.');
      }
      const { error, data } = res;
      if (error) {
        return console.error('Error while fetching user buyers.', error);
      }
      if (data && !error) {
        setAllSelectedBuyers(data as IBuyer[]);
      }
    };
    fetchUserBuyers();
  }, [selectedUser]);

  useEffect(() => {
    const timeoutRef = setTimeout(() => {}, snackbarOptions.timeout);
    return () => {
      clearTimeout(timeoutRef);
    };
  }, [snackbarOptions]);

  const handleSaveEdit = async () => {
    if (!selectedUser || !selectedUser.username || selectedUser.username === '') {
      return;
    }
    const userInfo: IUserInfo = {
      username: selectedUser.username,
      password: '',
      buyers: allSelectedBuyers.map((x) => {
        return {
          username: selectedUser.username,
          buyerId: x.buyerId,
        } as IUserBuyers;
      }),
      isBlocked: selectedUser.isBlocked,
    };
    const res: Partial<IResponse> | null | undefined = await trackPromise(API.UserApi.updateUser(userInfo));
    if (!res) {
      return setSnackbarOptions({
        ...snackbarOptions,
        message: 'Greska u komunikaciji sa serverom',
        open: true,
        severity: 'error',
      });
    }
    const { error, message } = res;
    if (error) {
      return setSnackbarOptions({
        ...snackbarOptions,
        message: `${error}`,
        open: true,
        severity: 'error',
      });
    }
    if (message && !error) {
      return setSnackbarOptions({
        ...snackbarOptions,
        message: `Korisnik ${selectedUser.username} uspesno izmenjen`,
        open: true,
        severity: 'success',
      });
    }
  };

  return (
    <Box className='edit-user-form'>
      <Typography variant='h5' component='div'>
        Izmenite korisnika
      </Typography>
      <Divider className='edit-user-form__mb-8' />
      {selectedUser && selectedUser.username !== '' && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <SelectBuyersCard />
            <Divider className='edit-user-form__mb-8' />
            <Button
              onClick={handleSaveEdit}
              variant='contained'
              color='primary'
              fullWidth={true}
              disabled={!(selectedUser && selectedUser.username !== '')}
            >
              Izmeni korisnika
            </Button>
          </div>
        </>
      )}
      <KomAppSnackbar {...snackbarOptions} />
    </Box>
  );
};

export default EditUserForm;
