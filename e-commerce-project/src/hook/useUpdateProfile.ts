import { useMutation } from 'react-query';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const useUpdateProfile = () => {

    const navigate = useNavigate()
    return useMutation(authService.updateUserProfile, {
        onSuccess: () => {
            setTimeout(() => {
                navigate('/')
            },  1000)
        },
        onError: (error) => {
            console.error('Registration failed', error);
        },
    });
};