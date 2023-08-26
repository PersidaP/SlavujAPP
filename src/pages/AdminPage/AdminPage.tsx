import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { API } from '../../api/API';
import AddUserForm from '../../components/cards/AddUserForm/AddUserForm';
import { IBuyer, IExternalUser, IResponse, ISnackbar, IUser, IUserInfo } from '../../interfaces/interfaces';
import { buyersAtom, defaultUserState, externalUsersAtom, usersAtom } from '../../store/store';
import EditUserForm from '../../components/cards/EditUserForm/EditUserForm';
import './AdminPage.styles.scss';
import { Button, Grid } from '@mui/material';
import KomAppTable from '../../components/cards/KomAppTable/KomAppTable';
import KomAppDialog from '../../components/cards/KomAppDialog/KomAppDialog';
import { defaultSnackbarOptions } from '../../utils/const';
import KomAppSnackbar from '../../components/cards/snackbar/snackbar';
import { Box } from '@mui/system';
import { trackPromise } from 'react-promise-tracker';

const AdminPage = () => {
  const [users, setUsers] = useAtom(usersAtom);
  const [_externalUsers, setExternalUsers] = useAtom(externalUsersAtom);
  const [_buyers, setBuyers] = useAtom(buyersAtom);
  const [selectedUser, setSelectedUser] = useState<Partial<IUser>>(defaultUserState);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogChild, setDialogChild] = useState<'add' | 'edit'>('edit');

  const [snackbarOptions, setSnackbarOptions] = useState<ISnackbar>(defaultSnackbarOptions);

  const getDialogChildren = () => {
    if (dialogChild === 'add') {
      return <AddUserForm />;
    } else if (dialogChild === 'edit') {
      return <EditUserForm selectedUser={selectedUser} />;
    } else {
      console.error('Dialog child not found.');
      return <></>;
    }
  };

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

  useEffect(() => {
    const fetchUsers = async () => {
      const res: Partial<IResponse> | null | undefined = await trackPromise(API.UserApi.getAllUsers());
      if (!res) {
        return console.error('Error, could not react the server while fetching users.');
      }
      const { error, data } = res;
      if (error) {
        return console.error('Error while fetching users.', error);
      }
      if (data && !error) {
        setUsers(data as Array<Partial<IUser>>);
      }
    };

    const fetchExternalUsers = async () => {
      const res: Partial<IResponse> | null | undefined = await trackPromise(API.UserApi.getExternalUsers());
      if (!res) {
        return console.error('Error, could not reach the server while fetching external users.');
      }
      const { error, data } = res;
      if (error) {
        return console.error('Error while fetching external users.', error);
      }
      if (data && !error) {
        setExternalUsers((data as Array<IExternalUser>) || ([] as Array<IExternalUser>));
      }
    };

    const fetchAllBuyers = async () => {
      const res: Partial<IResponse> | null | undefined = await trackPromise(API.BuyerApi.getAllBuyers());
      if (!res) {
        return console.error('Error, could not reach the server while fetching buyers.');
      }
      const { error, data } = res;
      if (error) {
        return console.error('Error while fetching buyers.', error);
      }
      if (data && !error) {
        setBuyers(data as Array<IBuyer>);
      }
    };

    fetchUsers();
    fetchExternalUsers();
    fetchAllBuyers();
  }, [setUsers, setExternalUsers, setBuyers]);

  return (
    <>
      <Box className='adminPage__toolbar'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            setDialogChild('add');
            setDialogOpen(!dialogOpen);
          }}
        >
          Dodaj korisnika
        </Button>
      </Box>
      <Grid className='adminPage__grid' container spacing={2}>
        <Grid className='adminPage__grid__item' item xs={12} sm={6} md={6} lg={6} xl={6}>
          <KomAppTable
            data={users}
            columnsToDisplay={[
              { columnName: 'username', label: 'Korisnik' },
              { columnName: 'isBlocked', label: 'Aktivan' },
              { columnName: 'externalUserId', label: 'Eksterni korisnik' },
            ]}
            onRowClick={(res: Partial<IUser>) => {
              setSelectedUser(res);
              setDialogChild('edit');
              setDialogOpen(true);
            }}
            actions={[
              {
                label: 'X',
                getIsDisabled: function (): boolean {
                  return this.disabled || false;
                },
                func: async function (item: object) {
                  const user = item as IUser;
                  if (user.isBlocked) {
                    this.disabled = user.isBlocked;
                  }
                  const userInfo: IUserInfo = {
                    username: user.username,
                    password: '',
                    buyers: user.buyers
                      ? user.buyers.map((x: IBuyer) => {
                          return {
                            username: user.username,
                            buyerId: x.buyerId,
                          };
                        })
                      : [],
                    isBlocked: true,
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
                    setSnackbarOptions({
                      ...snackbarOptions,
                      message: `Korisnik ${selectedUser.username} uspesno blokiran.`,
                      open: true,
                      severity: 'success',
                    });
                    setUsers(
                      users.map((u) => {
                        if (u.username === user.username) {
                          return { ...u, isBlocked: true };
                        } else {
                          return u;
                        }
                      })
                    );
                  }
                },
                color: 'error',
              },
              {
                label: '✔',
                getIsDisabled: function () {
                  return this.disabled;
                },
                func: async function (item: object) {
                  const user = item as IUser;
                  if (!user.isBlocked) {
                    this.disabled = !user.isBlocked;
                  }
                  const userInfo: IUserInfo = {
                    username: user.username,
                    password: '',
                    buyers: user.buyers
                      ? user.buyers.map((x: IBuyer) => {
                          return {
                            username: user.username,
                            buyerId: x.buyerId,
                          };
                        })
                      : [],
                    isBlocked: false,
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
                    setSnackbarOptions({
                      ...snackbarOptions,
                      message: `Korisnik ${selectedUser.username} uspesno odblokiran.`,
                      open: true,
                      severity: 'success',
                    });
                    setUsers(
                      users.map((u) => {
                        if (u.username === user.username) {
                          return { ...u, isBlocked: false };
                        } else {
                          return u;
                        }
                      })
                    );
                  }
                },
                color: 'primary',
              },
            ]}
          />
        </Grid>
      </Grid>
      <KomAppDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        {getDialogChildren()}
      </KomAppDialog>
      <KomAppSnackbar {...snackbarOptions} />
    </>
  );
};

export default AdminPage;
