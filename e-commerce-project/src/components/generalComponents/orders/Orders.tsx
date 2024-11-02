import { useEffect, useState } from "react";
import Table from "../../common/table/Table";
import orderService from "../../../services/orderService";
import { IUserOrderResponse } from "../../../types/orderTypes";
import { IAdminOrderResponse } from "../../../types/orderTypes";
import { isAdmin } from "../../../stores/adminStore";
import mockPhoto from "../../../assets/images/mockImage.png";
import { NavLink } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";

interface IOrders {
  [index: string]: string | number | boolean | JSX.Element;
}

const headers = [
  "عکس",
  "نام محصول",
  "تاریخ",
  ...(isAdmin() ? ["کاربر"] : []),
  "قیمت نهایی",
  "پرداخت",
  "ارسال",
  // "عملیات",
];

const Orderscopy: React.FC = () => {
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [ordersTitle, setOrdersTitle] = useState<IOrders[]>([]);
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    let newOrder: IOrders[];

    if (isAdmin()) {
      const response = await orderService.getAllOrdersAdmin();
      newOrder = response
        .map((order: IAdminOrderResponse) =>
          order.orderItems.map((item) => ({
            عکس: mockPhoto, // item.image
            "نام محصول": item.name,
            تاریخ: new Date(order.createdAt).toLocaleDateString("fa-IR"),
            کاربر: order.user ? order.user.username : "admin",
            "قیمت نهایی": (item.qty * item.price).toLocaleString("fa-IR"),
            پرداخت: order.isPaid ? "پرداخت شده" : "پرداخت نشده",
            ارسال: order.isDelivered ? "ارسال شده" : "ارسال نشده",
            // عملیات: "جزئیات",
            orderId: order._id,
          }))
        )
        .flat();
      setOrders(newOrder);

      setOrdersTitle(response);
    } else {
      const res = await orderService.getAllOrdersMine();

      newOrder = res
        ?.map((order: IUserOrderResponse) =>
          order?.orderItems?.map((item) => ({
            عکس: mockPhoto, //item.image
            "نام محصول": item.name,
            تاریخ: new Date(order.createdAt).toLocaleDateString("fa-IR"),
            "قیمت نهایی": (item.qty * item.price).toLocaleString("fa-IR"),
            پرداخت: order.isPaid ? "پرداخت شده" : "پرداخت نشده",
            ارسال: order.isDelivered ? "ارسال شده" : "ارسال نشده",
            // عملیات: "جزئیات",
            orderId: order._id,
          }))
        )
        .flat();
      setOrders(newOrder);
      setOrdersTitle(res);
    }
  }
  const handleClick = (id) => {
    setIsActive((prev) => (prev === id ? null : id));
  };
  return (
    <div className="min-h-screen pt-24 px-8 flex transition-height duration-700 ease-in-out flex-col gap-4">
      <h1 className="text-[3rem] text-primary-main">{` لیست سفارشها : ${ordersTitle.length} مورد`}</h1>
      <br />
      {ordersTitle.map((order, i) => (
        <div key={i} className="flex flex-col justify-between">
          <button
            onClick={() => handleClick(order._id)}
            className="w-full flex flex-row h-32 bg-white dark:bg-dark-base-side border hover:shadow-md dark:hover:shadow-gray-400 dark:hover:shadow-sm border-base-text-field-stroke dark:border-dark-base-text-field-stroke items-center rounded-3xl p-8 text-[1.6rem] dark:text-dark-text-primary"
          >
            <IoIosArrowDropdownCircle className={`text-[2.4rem] ml-10 text-primary-main transition-all duration-400 ease-in-out ${isActive === order._id ? "rotate-90" : "rotate-0"}`} />
            <span className="w-[35%] text-right">شماره سفارش : {order._id}</span>
            <span className="w-[20%] text-right">
              مبلغ کل : {`${order.totalPrice.toLocaleString("fa-IR")} تومان`}
            </span>
            <span className="w-[20%] text-primary-main">
              وضعیت :{" "}
              {order.isDelivered
                ? "ارسال شده"
                : `${order.isPaid ? "پرداخت شده" : "در انتظار پرداخت"}`}
            </span>
            <span className="w-[20%]">
              تاریخ ثبت سفارش :{" "}
              {typeof order.createdAt === "string" || typeof order.createdAt === "number"
                ? new Date(order.createdAt).toLocaleDateString("fa-IR")
                : "تاریخ مشخص نیست"}
            </span>
            <NavLink
              to={
                isAdmin()
                  ? order.isPaid && order.isDelivered
                    ? `/detail/deliverd/${order._id}`
                    : `/checkout/${order._id}`
                  : `/detail/${order._id}`
              }
              className="bg-primary-main px-[1.2rem] py-[0.8rem] rounded-[0.8rem] text-[1.4rem] text-text-button font-normal"
            >
              جزئیات
            </NavLink>
          </button>
  
          <div
            className={`transition-all duration-700 ease-in-out mt-10 ${
              isActive === order._id ? "block" : "hidden"
            } bg-primary-lighter dark:bg-[#4a0d29] rounded-3xl`}
          >
            <Table
              optionalWidth="w-full"
              items={orders.filter((item) => item.orderId === order._id)}
              headers={headers}
            />
          </div>
        </div>
      ))}
    </div>
  );  
};

export default Orderscopy;
