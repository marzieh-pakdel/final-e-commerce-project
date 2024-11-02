import { useMutation } from "react-query";
import authService from "../services/authService";
import toast from "react-hot-toast";

export const useDeleteUser = () => {
  return useMutation(authService.deleteUserById, {
    onSuccess: () => {
        toast.success("حدف با موفقیت انجام شد");

    },
    onError: (error) => {
      toast.success("failed");

      console.error("Registration failed", error);
    },
  });
};
