import axios from 'axios';
import { API_URLS } from '../utils/const';

const getUserBuyers = async (username?: string) => {
  try {
    let url;
    if (username) {
      url = `${API_URLS.baseURI}${API_URLS.buyers}?username=${username}`;
    } else {
      url = `${API_URLS.baseURI}${API_URLS.buyers}`;
    }
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')!).token} `,
      },
    });
    return data;
  } catch (err) {
    console.log('Error while fetching user buyers from the server', err);
  }
};

const getAllBuyers = async () => {
  try {
    const url = `${API_URLS.baseURI}${API_URLS.allBuyers} `;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')!).token} `,
      },
    });
    return data;
  } catch (err) {
    console.log('Error while fetching all buyers from the server', err);
  }
};

export const BuyerApi = {
  getUserBuyers,
  getAllBuyers,
};
