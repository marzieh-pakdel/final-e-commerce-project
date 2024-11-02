import { useMutation } from 'react-query';
import authService from '../services/authService';
import { IUser } from '../types/authTypes';

export const useUpdateUser = () => {

    return useMutation((data: { id: string; updateparam: Partial<IUser> }) =>authService.updateUser(data.id, data.updateparam),  
      
    
);
};