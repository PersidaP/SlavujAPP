import axios from 'axios';
import { IResponse, IUser, IUserInfo } from '../interfaces/interfaces';
import { API_URLS } from '../utils/const';

const getAllUsers = async () => {
  try {
    const url = `${API_URLS.baseURI}${API_URLS.user}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')!).token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getExternalUsers = async () => {
  try {
    const url = `${API_URLS.baseURI}${API_URLS.externalUsers}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')!).token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (user: Partial<IUser>) => {
  try {
    const url = `${API_URLS.baseURI}${API_URLS.user}`;
    const { data } = await axios.post(url, user, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')!).token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (username: string): Promise<IResponse | null | undefined> => {
  try {
    const url = `${API_URLS.baseURI}${API_URLS.user}?username=${username}`;
    const { data } = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')!).token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (user: Partial<IUserInfo>) => {
  try {
    const url = `${API_URLS.baseURI}${API_URLS.user}`;
    const { data } = await axios.put(url, user, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')!).token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const UserApi = {
  getAllUsers,
  getExternalUsers,
  createUser,
  updateUser,
  deleteUser,
};
