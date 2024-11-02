import axiosClient from "../api/axiosClient";
import { IOrderItems, IPaymentMethod, IShippingAddress } from '../types/orderTypes'

const orderService = {


    createOrder: async (orderItems: IOrderItems[], paymentMethod: IPaymentMethod, shippingAddress: IShippingAddress) => {
        const response = await axiosClient.post("/orders", {
            orderItems, paymentMethod, shippingAddress
        });
        return response.data;
    },

    getAllOrdersAdmin: async () => {
        const response = await axiosClient.get('/orders')
        return response.data
    },

    getAllOrdersMine: async () => {
        const response = await axiosClient.get('/orders/mine')
        return response.data
    },

    getTotalSales: async () => {
        const response = await axiosClient.get('/orders/total-sales')
        return response.data
    },

    getTotalSalesByDate: async () => {
        const response = await axiosClient.get('/orders/total-sales-by-date')
        return response.data
    },

    getOrder: async (_id: string) => {
        const response = await axiosClient.get(`/orders/${_id}`)
        return response.data
    },

    makeOrderPaid: async (_id: string) => {
        const response = await axiosClient.put(`/orders/${_id}/pay`)
        return response.data
    },

    makeOrderDeliverd: async (_id: string) => {
        const response = await axiosClient.put(`/orders/${_id}/deliver`)
        return response.data
    },
}


export default orderService