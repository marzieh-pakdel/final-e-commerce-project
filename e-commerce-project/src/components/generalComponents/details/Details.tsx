import Table from "../../common/table/Table";
import Status from "../../common/status/Status";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import orderService from "../../../services/orderService";
import { adminStore } from "../../../stores/adminStore";
import { IInformation } from "../../../types/orderTypes";
import { IItem } from "../../../types/orderTypes";

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
  const [items, setItems] = useState<IItem[]>([]);
  const [status, setStatus] = useState<string>("");
  const { id } = useParams();
  const isAdmin = adminStore((state) => state.isAdmin);

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

      const filter = res.orderItems.map((item: IItem) => {
        return {
          عکس: "sdfsdf",
          "نام محصول": item.name,
          تعداد: item.qty,
          قیمت: item.price,
          "قیمت نهایی": res.totalPrice,
        };
      });
      setItems(filter);
      setStatus(isAdmin ? res.isPaid : res.isDelivered);
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  const condition = () => {
    if (isAdmin) {
      return (
        <Status
          isNeedButton={false}
          status={status ? "پرداخت شده" : "پرداخت نشده"}
          information={information}
        />
      );
    } else {
      return (
        <Status
          isNeedButton={false}
          status={status ? "ارسال شده" : "ارسال نشده"}
          information={information}
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
