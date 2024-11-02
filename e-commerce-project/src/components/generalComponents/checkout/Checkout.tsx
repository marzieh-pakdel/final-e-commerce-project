import Table from "../../common/table/Table";
import Status from "../../common/status/Status";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import orderService from "../../../services/orderService";
import { adminStore } from "../../../stores/adminStore";
import CartStore from "../../../stores/cartStore";
import { IInformation } from "../../../types/orderTypes";
import { ITableItem } from "../../../types/orderTypes";
const headers = ["عکس", "نام محصول", "تعداد", "قیمت", "قیمت نهایی"];

const Checkout = () => {
  const [information, setInformation] = useState<IInformation>({
    _id: "",
    name: "",
    email: "",
    address: "",
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  });
  const [items, setItems] = useState<ITableItem[]>([]);
  const [status, setStatus] = useState<string>("");
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isDelivered, setIsDelivered] = useState<boolean>(false);
  const { id } = useParams();
  const isAdmin = adminStore((state) => state.isAdmin);
  const { clearCart } = CartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await orderService.getOrder(String(id));
      setInformation({
        _id: res._id,
        name: res.user.username,
        email: res.user.email,
        address: res.shippingAddress.address,
        shippingPrice: res.shippingPrice,
        taxPrice: res.taxPrice,
        totalPrice: res.totalPrice,
      });
      const filter = res.orderItems.map((item: ITableItem) => {
        return {
          عکس: item.image,
          "نام محصول": item.name,
          تعداد: item.qty,
          قیمت: item.price.toLocaleString('fa-IR'),
          "قیمت نهایی": (Number(item.qty) * Number(item.price)).toLocaleString('fa-IR'),
        };
      });
      setItems(filter);
      setStatus(isAdmin ? res.isPaid : res.isDelivered);
      setIsPaid(res.isPaid);
      setIsDelivered(res.isDelivered);
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  const makePay = () => {
    orderService.makeOrderPaid(String(id));
    navigate("/orders");
  };

  const makeDelivere = () => {
    orderService.makeOrderDeliverd(String(id));
    navigate("/orders");
  };

  const handleNavigate = () => {
    navigate("/orders");
    clearCart();
  };

  const condition = () => {
    if (isAdmin) {
      return (
        <Status
          isNeedButton={true}
          status={status ? "پرداخت شده" : "پرداخت نشده"}
          information={information}
          isDelivered={isDelivered}
          isPaid={isPaid}
          makeDeliver={makeDelivere}
          makePay={makePay}
        />
      );
    } else {
      return (
        <Status
          isNeedButton={true}
          status={status ? "ارسال شده" : "ارسال نشده"}
          information={information}
          handleNavigate={handleNavigate}
        />
      );
    }
  };

  return (
    <div className="flex justify-center items-start gap-[5.6rem] w-full h-full p-[9.7rem]">
      <Table optionalWidth="w-[45%]" headers={headers} items={items} />
      {condition()}
    </div>
  );
};

export default Checkout;
