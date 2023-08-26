import { IResponse, IUser } from '../interfaces/interfaces';
import axios from 'axios';
import { API_URLS } from '../utils/const';

const login = async (loginInfo: Partial<IUser>): Promise<IResponse | null | undefined> => {
  try {
    const url = `${API_URLS.baseURI}${API_URLS.login}`;
    const { data } = await axios.post(url, loginInfo);
    if (!data || !data.token || !data.roleId) {
      return null; // TODO: back to login when routing is implemented
    }
    const { token, roleId } = data;
    sessionStorage.setItem('token', JSON.stringify(data));
    return { token, roleId };
  } catch (err) {
    console.log(err);
  }
};
const checkLoginValidity = async (user: Partial<IUser>): Promise<boolean> => {
  try {
    const url = `${API_URLS.baseURI}${API_URLS.tokenCheck}`;
    const { data } = await axios.post(url, user, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return data?.valid || false;
  } catch (err) {
    return false;
  }
};

export const LoginApi = {
  login,
  checkLoginValidity,
};
