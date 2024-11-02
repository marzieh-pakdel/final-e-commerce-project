import { useMutation } from 'react-query';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../stores/authStore';
import { useDropDownStore } from '../stores/dropDownStore';

export const useLogin = () => {
    const navigate = useNavigate()
    const {dropDown,setDropDown}=useDropDownStore();
  
    const setIsAuth = useAuthStatus(state => state.setAuth)
    return useMutation(authService.login, {
        onSuccess: () => {
            setIsAuth(true)
            setTimeout(() => {
                if (dropDown) {  
                    setDropDown();  
                } 
            }, 1000)
            navigate('/');
        },
        onError: (error) => {
            setIsAuth(false)
            console.error('Login failed :', error);
        },
    });
};