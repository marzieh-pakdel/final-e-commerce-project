// import { isAdmin } from './../stores/adminStore';
import axiosClient from "../api/axiosClient";
import { ILoginType, IRegisterType, IUpdateUser, IUser } from '../types/authTypes'
import { setIsAdmin } from "../stores/adminStore";

const authService = {

    // Create User
    register: async ({ username, email, password, confirm_Password }: IRegisterType) => {
        const response = await axiosClient.post("/users", {
            username,
            email,
            password,
            confirm_Password,
        });
        return response.data;
    },

    // Login
    login: async ({ email, password }: ILoginType) => {
        const response = await axiosClient.post("/users/auth", {
            email,
            password,
        });
        setIsAdmin(response.data.isAdmin)
        return response.data;
    },

    // Logout
    logout: async () => {
        const response = await axiosClient.post('users/logout')
        return response.data
    },

    // Get All Users (Admin Auth)
    getAllUsers: async () => {
        const response = await axiosClient.get('/users')
        return response.data
    },

    // get User Profile
    getUserProfile: async () => {
        const response = await axiosClient.get('/users/profile')
        return response.data
    },


    // get user by id (Admin Auth)
    getUserById: async (_id: string) => {
        const response = await axiosClient.get(`/users/${_id}`)
        return response.data
    },

    // Update User Profile
    updateUserProfile: async ({ username, email, password }: IUpdateUser) => {
        const response = await axiosClient.put("/users/profile", {
            username,
            email,
            password,
        });
        return response.data;
    },
    // Update User
    updateUser: async (id: string,{ username, email, isadmin }: IUser) => {
        const response = await axiosClient.put(`/users/${id}`, {
            username,
            email,
            isadmin,
        });
        return response.data;
    },

    // Delete User By Id (Admin Auth) 
    deleteUserById: async (_id: string) => {
        const response = await axiosClient.delete(`/users/${_id}`)
        return response.data
    },

    // change the role (Admin auth)
    changeUserRole: async (_id: string) => {
        const response = await axiosClient.patch(`/role/${_id}`)
        return response.data
    }

};

export default authService;
