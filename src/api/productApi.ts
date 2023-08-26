import axios from 'axios';
import { API_URLS } from '../utils/const';

const getProduct = async (id: number) => {
  try {
    const url = `${API_URLS.baseURI}${API_URLS.products}/${id}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')!).token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(`Error while fetching product with id ${id} from the server`, err);
  }
};

const getAllProducts = async () => {
  try {
    const url = `${API_URLS.baseURI}${API_URLS.products}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')!).token}`,
      },
    });
    return data;
  } catch (err) {
    console.log('Error while fetching all products from the server', err);
  }
};

export const ProductApi = {
  getProduct,
  getAllProducts,
};
