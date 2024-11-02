import axiosClient from "../api/axiosClient";
import { IProductType, IFilterType } from "../types/productTypes";

const productService = {
    createProduct: async ({ name, description, price, category, quantity, image }: IProductType) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("category", category);
        formData.append("quantity", quantity.toString());
        if (image) {
            formData.append("image", image);
        }

        const response = await axiosClient.post('/products', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    createReview: async (rating: number, comment: string, _id: string) => {
        const response = await axiosClient.post(`/products/${_id}/reviews`, {
            rating, comment
        })

        return response.data
    },

    //Pagination
    //getAllProductsPg: {},

    getAllProducts: async () => {
        const response = await axiosClient.get('/products/allproducts')
        return response.data
    },

    getProduct: async (_id: string) => {
        const response = await axiosClient.get(`/products/${_id}`)
        return response.data
    },

    updateProduct: async (_id: string, { name, description, price, category, quantity, image }: IProductType) => {
        const response = await axiosClient.put(`/products/${_id}`, {
            name, description, price, category, quantity, image
        })
        return response.data
    },

    deleteProduct: async (_id: string) => {
        const response = await axiosClient.delete(`/products/${_id}`)
        return response.data
    },

    getNewProducts: async () => {
        const response = await axiosClient.get('/products/sort/new')
        return response.data
    },

    filterProducts: async ({ categories, price }: IFilterType) => {
        const response = await axiosClient.post('/products/filtered', {
            categories, price
        })

        return response.data
    },
}

export default productService
