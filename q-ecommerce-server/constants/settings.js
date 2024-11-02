import dotenv from "dotenv";
dotenv.config();

export const PER_PAGE = 2;

export const FREE_SHIPPING_MIN_STUFFS = 200000;
export const SHIPPING_PRICE = 50000;
export const TAX_RATE = 0.1;

export const STORAGE = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/uploads/' : 'http://185.8.174.74:8090/uploads/'
