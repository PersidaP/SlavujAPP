import { IBuyer, IDrawerItem, IExternalUser, IOrder, IPosition, IProduct, ISnackbar } from '../interfaces/interfaces';
import HistoryIcon from '@mui/icons-material/History';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LoginIcon from '@mui/icons-material/Login';

export const API_URLS = {
  // baseURI: 'http://localhost:3001',
  baseURI: '194.146.56.40',
  login: '/login',
  user: '/user',
  externalUsers: '/external-users',
  order: '/order',
  buyers: '/buyers',
  allBuyers: '/all-buyers',
  products: '/products',
  tokenCheck: '/check',
  orderHistory: '/order-history',
  payers: '/payers',
};

export const DRAWER_ITEMS: IDrawerItem[] = [
  {
    id: 1,
    label: 'Kreiraj porudzbinu',
    route: '/order',
    icon: <ReceiptIcon />,
    requiresAuth: true,
  },
  {
    id: 2,
    label: 'Istorija',
    route: '/history',
    icon: <HistoryIcon />,
    requiresAuth: true,
  },
  // {
  //   id: 3,
  //   label: 'Fakture',
  //   route: '/invoice',
  //   icon: <ReceiptIcon />,
  //   requiresAuth: true,
  // },
  // {
  //   id: 4,
  //   label: 'Izvestaji',
  //   route: '/report',
  //   icon: <AssessmentIcon />,
  //   requiresAuth: true,
  // },
  {
    id: 5,
    label: 'Login',
    route: '/login',
    icon: <LoginIcon />,
  },
];

export const defaultSnackbarOptions: ISnackbar = {
  message: '',
  severity: 'success',
  timeout: 5000,
  open: false,
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
};

export const defaultBuyerState: IBuyer = {
  buyerId: '',
  buyerName: '',
  buyerAddress: '',
  buyerPost: '',
  buyerVATCode: '',
  buyerRegistrationNumber: '',
  buyerEmail: '',
  buyerPhone: '',
  buyerWayOfSale: '',
};

export const defaultProductState: IProduct = {
  productId: '',
  productName: '',
  productPrice: 0,
  productRetailPrice: 0,
  productVATCode: '',
  productVAT: 0,
  productRebate: 0,
  productRebateQty: 0,
};

export const defaultOrderState: IOrder = {
  orderId: '',
  date: new Date(),
  orderStatus: '',
  orderValue: 0,
  orderValueVAT: 0,
  orderRebate: 0,
  orderPaymentDue: 0,
  orderBuyer: defaultBuyerState,
  orderProducts: [defaultProductState],
  orderComment: '',
};

export const positionDefaultState: IPosition = {
  productId: '',
  productName: '',
  productPrice: 0,
  productRetailPrice: 0,
  productVATCode: '',
  productVAT: 0,
  productRebate: 0,
  productRebateQty: 0,
  pricePerUnit: 0,
  totalPrice: 0,
};

export const defaultExternalUserState: IExternalUser = {
  userId: 0,
  user: '',
  userFullName: '',
};
