import axiosClient from "../api/axiosClient";


const categoryService = {
    createCategory: async (name: string) => {
        const response = await axiosClient.post('/category', {
            name
        });
        return response.data

    },

    updateCategory: async (name: string, categoryId: string) => {
        const response = await axiosClient.put(`/category/${categoryId}`,
            {
                name
            }
        )
        return response.data
    },

    deleteCategory: async (categoryId: string) => {
        const response = await axiosClient.delete(`/category/${categoryId}`)
        return response.data
    },

    listCategories: async () => {
        const response = await axiosClient.get('/category/categories')
        return response.data
    },

    getCategory: async (_id: string) => {
        const response = await axiosClient.get(`/category/${_id}`)
        return response.data
    }
}


export default categoryService