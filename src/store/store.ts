import { atom } from 'jotai';
import { IBuyer, IExternalUser, IProduct, IUser } from '../interfaces/interfaces';
import { defaultBuyerState, defaultExternalUserState, defaultProductState } from '../utils/const';

export const defaultUserState: Partial<IUser> = {
  username: '',
  token: '',
  roleId: -1,
  authenticated: false,
  buyers: [],
};

export const defaultUsersAtom: Array<Partial<IUser>> = [];
export const defaultExternalUsersAtom: Array<IExternalUser> = [];
export const defaultProductsAtom: Array<IProduct> = [];
export const defaultBuyersAtom: Array<IBuyer> = [];
export const defaultSelectedBuyersAtom: Array<IBuyer> = [];
export const defaultSelectedBuyerAtom: IBuyer = defaultBuyerState;
export const defaultSelectedProduct: IProduct = defaultProductState;
export const defaultSelectedExternalUser: IExternalUser = defaultExternalUserState;

export const userAtom = atom(defaultUserState);
export const productsAtom = atom(defaultProductsAtom);
export const buyersAtom = atom(defaultBuyersAtom);
export const usersAtom = atom(defaultUsersAtom);
export const externalUsersAtom = atom<Array<IExternalUser>>(defaultExternalUsersAtom);
export const drawerAtom = atom(false);
export const themeAtom = atom<'light' | 'dark'>('dark');

export const selectedBuyerAtom = atom(defaultSelectedBuyerAtom);
export const selectedBuyersAtom = atom(defaultSelectedBuyersAtom);
export const selectedProductAtom = atom(defaultSelectedProduct);
export const selectedExternalUserAtom = atom(defaultSelectedExternalUser);
