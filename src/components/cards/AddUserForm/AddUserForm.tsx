import { Box, Button, Divider, FormControl, FormHelperText, InputAdornment, TextField, TextFieldProps, Typography } from '@mui/material';
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import AccountIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { IExternalUser, IResponse, ISnackbar, IUser } from '../../../interfaces/interfaces';
import { defaultSnackbarOptions } from '../../../utils/const';
import './AddUserForm.styles.scss';
import { API } from '../../../api/API';
import { useAtom } from 'jotai';
import { externalUsersAtom, selectedBuyersAtom, selectedExternalUserAtom, usersAtom } from '../../../store/store';
import KomAppSnackbar from '../snackbar/snackbar';
import RoleSelect from '../../parts/RoleSelect/RoleSelect';
import { IData } from '../../parts/InputAutocomplete/InputAutocomplete';
import SelectBuyersCard from '../SelectBuyersCard/SelectBuyersCard';
import ExternalUserCard from '../ExternalUserCard/ExternalUserCard';
import { trackPromise } from 'react-promise-tracker';

const AddUserForm = () => {
  const [users, setUsers] = useAtom(usersAtom);
  const [externalUsers, setExternalUsers] = useAtom(externalUsersAtom);
  const [selectedExternalUser, setSelectedExternalUser] = useAtom(selectedExternalUserAtom);
  const [selectedBuyers, setSelectedBuyers] = useAtom(selectedBuyersAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const usernameInputRef = useRef<TextFieldProps>(null);
  const passwordInputRef = useRef<TextFieldProps>(null);
  const confirmPasswordInputRef = useRef<TextFieldProps>(null);
  const roleInputRef = useRef<SelectInputProps>(null);
  const [inputPasswordType, setInputPasswordType] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState<ISnackbar>(defaultSnackbarOptions);
  const [autocompleteExtlUsers, setAutocompleteExtlUsers] = useState<Array<IData>>([]);

  useEffect(() => {
    setAutocompleteExtlUsers(
      externalUsers.map((extUser: IExternalUser) => {
        return {
          id: extUser.userId.toString(),
          name: extUser.user,
          fullName: extUser.userFullName,
        };
      })
    );
  }, [externalUsers]);

  useEffect(() => {
    setSelectedBuyers([]);
  }, []);

  const handleAutocompleteSelected = (value: IData, type: 'buyer' | 'product' | 'externalUser') => {
    switch (type) {
      case 'externalUser': {
        if (value.id) {
          const foundExtUser = externalUsers.find((user) => user.userId.toString() === value.id);
          if (foundExtUser) {
            setSelectedExternalUser(foundExtUser);
          }
        }
        break;
      }
    }
  };

  useEffect(() => {
    setInputPasswordType(showPassword ? 'text' : 'password');
  }, [showPassword]);

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

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addDisabled) {
      setSnackbarOptions({
        ...snackbarOptions,
        message: 'Sva polja su obavezna',
        open: true,
        severity: 'error',
      });
      return;
    }
    const userInfo = {
      username: usernameInputRef.current.value as string,
      password: passwordInputRef.current.value as string,
      roleId: roleInputRef.current.value as number,
      externalUserId: selectedExternalUser.userId,
      buyers: selectedBuyers,
    };

    const data: Partial<IResponse> | null | undefined = await trackPromise(API.UserApi.createUser(userInfo));
    if (!data) {
      return setSnackbarOptions({
        ...snackbarOptions,
        message: 'Greska u komunikaciji sa serverom',
        open: true,
        severity: 'error',
      });
    }

    const { message, error } = data;
    if (error) {
      return setSnackbarOptions({
        ...snackbarOptions,
        message: `${error}`,
        open: true,
        severity: 'error',
      });
    }
    if (message && !error) {
      const newUser: Partial<IUser> = {
        username: userInfo.username,
        roleId: userInfo.roleId,
      };
      setUsers([...users, newUser]);
      setSnackbarOptions({
        ...snackbarOptions,
        message: `Korisnik ${userInfo.username} uspesno kreiran`,
        open: true,
        severity: 'success',
      });
      setExternalUsers(externalUsers.filter((exUser) => exUser.userId !== userInfo.externalUserId));
    }
  };

  const clearForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handlePasswordChange = () => {
    checkPasswords();
  };

  const handleConfirmPasswordChange = () => {
    checkPasswords();
  };

  const checkPasswords = () => {
    if (!passwordInputRef?.current?.value || !confirmPasswordInputRef?.current?.value) {
      return setPasswordsMatch(false);
    }
    const password = passwordInputRef.current.value as string;
    const confirmPassword = confirmPasswordInputRef.current.value as string;
    password === confirmPassword ? setPasswordsMatch(true) : setPasswordsMatch(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const addDisabled =
    !usernameInputRef?.current?.value ||
    !passwordInputRef?.current?.value ||
    !confirmPasswordInputRef?.current?.value ||
    !roleInputRef?.current?.value ||
    selectedExternalUser.userId === 0 ||
    !selectedBuyers.length ||
    !passwordsMatch;

  return (
    <Box>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <Typography gutterBottom variant='h5' component='div'>
          Dodajte korisnika
        </Typography>
        <Divider className='add-user-form__mb-8' />
        <Box className='add-user-form__form-container'>
          <FormControl>
            <TextField
              className='add-user-form__text-field__padding-b8'
              label='Korisnicko ime'
              variant='outlined'
              size='small'
              inputRef={usernameInputRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position='end'
                    sx={{
                      backgroundColor: 'transparent',
                    }}
                  >
                    <AccountIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl error={!passwordsMatch} className='add-user-form__text-field__padding-b8'>
            <TextField
              type={inputPasswordType}
              error={!passwordsMatch}
              label='Lozinka'
              variant='outlined'
              size='small'
              inputRef={passwordInputRef}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position='end'
                    sx={{
                      backgroundColor: 'transparent',
                    }}
                  >
                    {showPassword ? (
                      <VisibilityIcon className='add-user-form__visibility-icon' onClick={handleClickShowPassword} />
                    ) : (
                      <VisibilityOffIcon className='add-user-form__visibility-icon' onClick={handleClickShowPassword} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            {!passwordsMatch && <FormHelperText>Lozinke se ne podudaraju</FormHelperText>}
          </FormControl>
          <FormControl error={!passwordsMatch} className='add-user-form__text-field__padding-b8'>
            <TextField
              type={inputPasswordType}
              error={!passwordsMatch}
              label='Potvrdite lozinku'
              variant='outlined'
              size='small'
              inputRef={confirmPasswordInputRef}
              onChange={handleConfirmPasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position='end'
                    sx={{
                      backgroundColor: 'transparent',
                    }}
                  >
                    {showPassword ? (
                      <VisibilityIcon className='add-user-form__visibility-icon' onClick={handleClickShowPassword} />
                    ) : (
                      <VisibilityOffIcon className='add-user-form__visibility-icon' onClick={handleClickShowPassword} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            {!passwordsMatch && <FormHelperText>Lozinke se ne podudaraju</FormHelperText>}
          </FormControl>
          <ExternalUserCard autocompleteExternalUsers={autocompleteExtlUsers} handleAutocompleteSelected={handleAutocompleteSelected} />
          <RoleSelect ref={roleInputRef} className='add-user-form__mb-8 add-user-form__mt-8' />
          <Divider className='add-user-form__divider' />
          <SelectBuyersCard />
        </Box>
        <Divider className='add-user-form__divider' />
        <Button disabled={addDisabled} type='submit' variant='contained' color='primary' size='small' fullWidth={true}>
          Dodaj korisnika
        </Button>
      </form>
      <KomAppSnackbar {...snackbarOptions} />
    </Box>
  );
};

export default AddUserForm;
