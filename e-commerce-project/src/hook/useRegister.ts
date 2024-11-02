import { useMutation } from 'react-query';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../stores/authStore';
export const useRegister = () => {

    const navigate = useNavigate()
    const setIsAuth = useAuthStatus(state => state.setAuth)
    return useMutation(authService.register, {
        onSuccess: () => {
            setIsAuth(true)
            navigate('/login')
        },
        onError: (error) => {
            setIsAuth(false)
            console.error('Registration failed', error);
        },
    });
};