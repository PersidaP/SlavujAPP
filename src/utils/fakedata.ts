import { IBuyer, IOrder, IProduct } from '../interfaces/interfaces';

export const mockedProducts: IProduct[] = [
  {
    productId: '141241245r5r',
    productName: 'Mleko',
    productPrice: 150,
    productRetailPrice: 120,
    productVATCode: 'ad3qrtq3r',
    productVAT: 100,
    productRebate: 100,
    productRebateQty: 100,
  },
  {
    productId: 'afcsdrgh4wgtw4',
    productName: 'Sir',
    productPrice: 150,
    productRetailPrice: 120,
    productVATCode: 'ad3qrtq3r',
    productVAT: 100,
    productRebate: 100,
    productRebateQty: 100,
  },
  {
    productId: '1tg24g2hkhkhh',
    productName: 'Brasno',
    productPrice: 150,
    productRetailPrice: 120,
    productVATCode: 'ad3qrtq3r',
    productVAT: 100,
    productRebate: 100,
    productRebateQty: 100,
  },
];

export const mockedBuyers: IBuyer[] = [
  {
    buyerId: 'asdsfb',
    buyerName: 'Mirko mirko',
    buyerAddress: 'Mirkova 8',
    buyerPost: 'adasd',
    buyerVATCode: 'asdasd',
    buyerRegistrationNumber: 'sdasdasd',
    buyerEmail: 'sdasdasd',
    buyerPhone: '12312e',
    buyerWayOfSale: 'asdasdasd',
  },
  {
    buyerId: '123123123',
    buyerName: 'Zirko',
    buyerAddress: 'Zirkova 9',
    buyerPost: 'adasd',
    buyerVATCode: 'asdasd',
    buyerRegistrationNumber: 'sdasdasd',
    buyerEmail: 'sdasdasd',
    buyerPhone: '12312e',
    buyerWayOfSale: 'asdasdasd',
  },
];

export const mockedOrders: IOrder[] = [
  {
    orderId: 'qwerrytufhgjadsf',
    date: new Date(),
    orderStatus: 'Completed',
    orderValue: 1000,
    orderValueVAT: 1200,
    orderRebate: 100,
    orderPaymentDue: 100,
    orderProducts: mockedProducts,
    orderBuyer: mockedBuyers[0],
    orderComment: ''
  },
  {
    orderId: 'vfsavasfvasfdvsa',
    date: new Date(),
    orderStatus: 'Completed',
    orderValue: 1000,
    orderValueVAT: 1200,
    orderRebate: 100,
    orderPaymentDue: 100,
    orderProducts: mockedProducts,
    orderBuyer: mockedBuyers[1],
    orderComment: ''
  },
  {
    orderId: 'zxcvkljcasdfsnm',
    date: new Date(),
    orderStatus: 'Completed',
    orderValue: 1000,
    orderValueVAT: 1200,
    orderRebate: 100,
    orderPaymentDue: 100,
    orderProducts: mockedProducts,
    orderBuyer: mockedBuyers[0],
    orderComment: ''
  },
];
