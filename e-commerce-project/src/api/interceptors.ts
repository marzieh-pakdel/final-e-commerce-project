import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { setIsAdmin } from '../stores/adminStore'
const applyInterceptors = (axiosClient: AxiosInstance) => {
    axiosClient.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosClient.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (error) => {
            const status = error.response?.status;
            if (status === 401 || status === 403 || status === 500) {
                axiosClient.post('/users/logout')
                window.location.href = '/login'
                setIsAdmin(false)
                localStorage.clear()
            }

            return Promise.reject(error);
        }
    );
}

export default applyInterceptors;
