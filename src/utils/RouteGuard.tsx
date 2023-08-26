import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { API } from '../api/API';
import { IUser } from '../interfaces/interfaces';
import { defaultUserState, userAtom } from '../store/store';
const validateUser = (user: Partial<IUser>, valid: boolean) => {
  // TODO: extract 3 to const (combine with admin roleIds
  return !!(user.token && user.roleId === 3 && user.username && valid);
};

const validateAdmin = (user: Partial<IUser>, valid: boolean) => {
  return !!(
    user.token &&
    [1, 2].includes(user.roleId || -1) && // TODO: extract [1,2] to const
    user.username &&
    valid
  );
};

export const UserRouteWrapper = (props: any) => {
  const location = useLocation();
  const [user, setUser] = useAtom(userAtom);

  const [auth, setAuth] = useState<boolean | undefined>();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    API.LoginApi.checkLoginValidity(user).then((valid) => {
      if (!token) {
        setAuth(false);
        setUser(defaultUserState);
      } else {
        setAuth(validateUser(user, valid));
        setUser({ ...user, authenticated: validateUser(user, valid) });
      }
    });
  }, [token, location.pathname]);

  if (auth === undefined) {
    return null;
  }

  return auth ? props.children : <Navigate to='/login' replace state={{ from: location }} />;
};

export const AdminRouteWrapper = (props: any) => {
  const location = useLocation();
  const [user, setUser] = useAtom(userAtom);

  const [auth, setAuth] = useState<boolean | undefined>();

  useEffect(() => {
    API.LoginApi.checkLoginValidity(user).then((valid) => {
      setAuth(validateAdmin(user, valid));
      setUser({ ...user, authenticated: validateAdmin(user, valid) });
    });
  }, []);

  if (auth === undefined) {
    return null;
  }

  return auth ? props.children : <Navigate to='/login' replace state={{ from: location }} />;
};
