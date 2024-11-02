import { useEffect, useState } from "react";
import Table from "../../common/table/Table";
import { MdDeleteForever } from "react-icons/md";
import authService from "../../../services/authService";
import { IUserListType, IUserType } from "../../../types/userType";
import { useDeleteUser } from "../../../hook/useDeleteUser";
import toast from "react-hot-toast";
interface ITableItem {
  [index: string]: string | number | boolean | JSX.Element;
}
const UsersList = () => {
  const headers = ["ID", "نام", "ایمیل", "ادمین", "عملیات"];
  const [users, setUsers] = useState<ITableItem[]>();

  const mapUserData = (user: IUserType): IUserListType => ({
    ID: user._id,
    نام: user.username,
    ایمیل: user.email,
    ادمین: user.isAdmin ,
    عملیات: <MdDeleteForever />,
  });

  const fetchAllUsers = async () => {
    try {
      const userList = await authService.getAllUsers();
      const newUserList = userList.map(mapUserData);
      setUsers(newUserList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  
  const delUser = useDeleteUser();
  const deleteUser = async (id: string) => {
    return delUser.mutate(id, {
      onSuccess: () => {

        setTimeout(() => {
          
          fetchAllUsers()
        }, 1000);
      },
      onError: () => {
        toast.error("ناموفق!مجدد تلاش کنید");
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-5/6 mt-24 h-[60rem] overflow-y-auto">
        {users ? (
          <Table headers={headers} items={users} delAction={true} delfunction={deleteUser}/>
        ) : (
          <div className="text-green-600 w-full h-full flex justify-center items-center text-5xl">
            <h1>...Loading</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
