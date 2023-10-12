import { ReactElement } from 'react';
import { IData } from '../components/parts/InputAutocomplete/InputAutocomplete';

export interface IUser {
  username: string;
  token?: string;
  roleId?: number;
  isBlocked?: boolean;
  buyers?: Array<IBuyer>;
  externalUserId?: number | null;
  authenticated?: boolean;
}

export interface IUserInfo {
  username: string;
  password: string;
  roleId?: number;
  isBlocked?: boolean;
  buyers?: Array<IUserBuyers>;
  externalUserId?: number | null;
}

export interface IUserBuyers {
  username: string;
  buyerId: string;
}

export interface IProduct {
  productId: string;
  productName: string;
  productPrice: number;
  productRetailPrice: number;
  productVATCode: string;
  productVAT: number;
  productRebate: number;
  productRebateQty?: number;
  productQty?: number;
}

export interface IOrder {
  orderId: string;
  date: Date;
  externalOrderId?: string;
  orderStatus: string;
  orderValue: number;
  orderValueVAT: number;
  orderRebate: number;
  orderPaymentDue: number;
  orderBuyer: IBuyer;
  orderProducts: Array<Partial<IProduct>>;
  orderComment: string;
}

export interface IOrderModel {
  orderId: string;
  externalOrderId: string;
  orderBuyerId: string;
  orderDate: string;
  orderStatus: string;
  orderPaymentDue: number;
  orderValue: number;
  orderValueVAT: number;
  orderRebate: number;
  products: IProduct[];
}

export interface IOrderFilters {
  dateFrom?: string;
  dateTo?: string;
  buyerId?: string;
}

export interface IBuyer {
  buyerId: string;
  buyerName: string;
  buyerAddress: string;
  buyerPost: string;
  buyerVATCode: string;
  buyerRegistrationNumber: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerWayOfSale: string;
}

export interface IToken {
  token?: string;
}
export interface IResponse {
  token?: string;
  roleId?: number;
  message?: string;
  valid?: boolean;
  error?: string;
  data?:
    | IBuyer
    | Array<IBuyer>
    | IProduct
    | Array<IProduct>
    | IOrder
    | Array<IOrder>
    | Array<Partial<IUser>>
    | IExternalUser
    | Array<IExternalUser>;
  statusCode?: string;
}

export interface IAnchorOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right' | 'center';
}

export interface ISnackbar {
  message: string;
  timeout: number;
  open: boolean;
  severity: 'error' | 'warning' | 'info' | 'success';
  anchorOrigin: IAnchorOrigin;
}

export interface IDrawerItem {
  id: number;
  label: string;
  route: string;
  icon: ReactElement;
  requiresAuth?: boolean;
}

export interface IDialogAction {
  name: string;
  func: Function;
  color: 'error' | 'primary';
}

export interface IDialogColumn {
  columnName: string;
  label: string;
}

export interface ITableColumn {
  columnName: string;
  label: string;
  isEditable?: boolean;
  onChangeFunc?: Function;
}

export interface IExternalUser {
  userId: number;
  user: string;
  userFullName: string;
}

export interface ITableAction {
  label: string;
  func: Function;
  color: 'error' | 'primary';
  disabled?: boolean;
  getIsDisabled: Function;
}

export interface IPosition extends IProduct {
  pricePerUnit: number;
  totalPrice: number;
}
