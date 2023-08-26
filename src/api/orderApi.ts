import axios from 'axios';
import { IOrder, IOrderFilters, IOrderModel } from '../interfaces/interfaces';
import { API_URLS } from '../utils/const';

const getAllOrders = async () => {
  try {
    const url = `${API_URLS.baseURI}${API_URLS.order}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')!).token}`,
      },
    });
    return data;
  } catch (err) {
    console.log('Error while fetching all orders from the server', err);
  }
};

const getOrderById = async (id: number) => {
  try {
    const url = `${API_URLS.baseURI}${API_URLS.order}/${id}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')!).token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(`Error while fetching order with id ${id} from the server`, err);
  }
};

const createOrder = async (order: Partial<IOrder>): Promise<string | null> => {
  try {
    const url = `${API_URLS.baseURI}${API_URLS.order}`;
    const { data } = await axios.post(url, order, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')!).token}`,
      },
    });
    return data?.orderId || '';
  } catch (err) {
    console.log(`Error while creating order`, err);
    return null;
  }
};

const getFilteredOrders = async (filters: IOrderFilters): Promise<Array<IOrderModel> | null> => {
  try {
    const filterParams = {
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      buyerId: filters.buyerId,
    };

    const query = Object.entries(filterParams)
      .filter(([key, value]) => !!value)
      .map(([key, value]) => `${key}=${value}`);
    const url = `${API_URLS.baseURI}${API_URLS.orderHistory}?${query.join('&')}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token')!).token}`,
      },
      data: filters,
    });
    return data as IOrderModel[];
  } catch (err) {
    console.log(`Error while fetching filtered orders from the server`, err);
    return null;
  }
};

export const OrderApi = {
  getAllOrders,
  getOrderById,
  createOrder,
  getFilteredOrders,
};
