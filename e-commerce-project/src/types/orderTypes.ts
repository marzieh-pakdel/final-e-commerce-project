export interface IOrderItems {
    _id: string,
    name: string,
    qty: number
}

export type IPaymentMethod = string

export interface IShippingAddress {
    address: string,
    city: string,
    postalCode: string
}
export interface IAddressInfoStore {
    address: string,
    city: string,
    country: string,
    postalCode: string,
    paymentMethod: string,
    setAddress: (newAddress: string) => void,
    setCity: (newCity: string) => void,
    setCountry: (newCountry: string) => void,
    setPostalCode: (newPostalCode: string) => void,
    setPaymentMethod: (newPaymentMethod: string) => void,
}


interface IOrderItemsResponse {
    image: string,
    name: string,
    qty: number,
    price: number,
    product: string,
    _id: string,
}

export interface IUserOrderResponse {
    shippingAddress: IShippingAddress,
    _id: string,
    user: string,
    orderItems: IOrderItemsResponse[],
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    isPaid: boolean,
    isDelivered: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number,
}

interface IUserDetailsResponse {
    _id: string,
    username: string
}

export interface IAdminOrderResponse {
    shippingAddress: IShippingAddress,
    _id: string,
    user: IUserDetailsResponse,
    orderItems: IOrderItemsResponse[],
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    isPaid: boolean,
    isDelivered: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number,
}

export interface IInformation {
    _id: string;
    name: string;
    email: string;
    address: string;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
}

export interface IItem {
    [index: string]: string | number | boolean | JSX.Element;
}
export interface ITableItem {
    [index: string]: string | number | boolean | JSX.Element;
  }