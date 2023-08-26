import { Button, Card, CardActions, CardContent, InputAdornment, TextField, TextFieldProps, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AccountIcon from '@mui/icons-material/AccountCircle';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { API } from '../../../api/API';
import { IResponse, ISnackbar } from '../../../interfaces/interfaces';
import KomAppSnackbar from '../snackbar/snackbar';
import './LoginCard.styles.scss';
import { userAtom } from '../../../store/store';
import { defaultSnackbarOptions } from '../../../utils/const';
import { trackPromise } from 'react-promise-tracker';

const LoginCard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);
  const [inputPasswordType, setInputPasswordType] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState<ISnackbar>(defaultSnackbarOptions);

  const usernameInputRef = useRef<TextFieldProps>(null);
  const passwordInputRef = useRef<TextFieldProps>(null);

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
    setInputPasswordType(showPassword ? 'text' : 'password');
  }, [showPassword]);

  const handleLoginFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!usernameInputRef?.current?.value || !passwordInputRef?.current?.value) {
      setSnackbarOptions({
        ...snackbarOptions,
        message: 'Korisnicko ime i lozinka su obavezni',
        open: true,
        severity: 'error',
      });
      return;
    }
    const userInfo = {
      username: usernameInputRef.current.value as string,
      password: passwordInputRef.current.value as string,
    };
    const data: Partial<IResponse> | null | undefined = await trackPromise(API.LoginApi.login(userInfo));
    console.log(data);
    if (!data) {
      return setSnackbarOptions({
        ...snackbarOptions,
        message: 'Greska u komunikaciji sa serverom',
        open: true,
        severity: 'error',
      });
    }
    const { token, roleId, error } = data;
    if (error || !token || !roleId) {
      return setSnackbarOptions({
        ...snackbarOptions,
        message: `${error}`,
        open: true,
        severity: 'error',
      });
    }
    if (token && roleId && !error) {
      setUser({ ...user, username: userInfo.username, token, roleId });
      setSnackbarOptions({
        ...snackbarOptions,
        message: `Uspesan login`,
        open: true,
        severity: 'success',
      });
      return roleId === 3 ? navigate('/order') : navigate('/admin');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Card className='login-card__container'>
        <form autoComplete='false' onSubmit={handleLoginFormSubmit}>
          <CardContent className='login-card__content'>
            <Typography gutterBottom variant='h5' component='div'>
              Ulogujte se
            </Typography>
            <TextField
              className='login-card__text-field__padding-b8'
              label='Korisnicko ime'
              variant='outlined'
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
            <TextField
              className='login-card__text-field__padding-b8'
              type={inputPasswordType}
              label='Lozinka'
              variant='outlined'
              inputRef={passwordInputRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position='end'
                    sx={{
                      backgroundColor: 'transparent',
                    }}
                  >
                    {showPassword ? (
                      <VisibilityIcon className='login-card__visibility-icon' onClick={handleClickShowPassword} />
                    ) : (
                      <VisibilityOffIcon className='login-card__visibility-icon' onClick={handleClickShowPassword} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
          <CardActions>
            <Button type='submit' variant='contained' color='primary' fullWidth={true}>
              Login
            </Button>
          </CardActions>
        </form>
      </Card>
      <KomAppSnackbar {...snackbarOptions} />
    </>
  );
};

export default LoginCard;
