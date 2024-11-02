import Table from "../../../common/table/Table";
import Button from "../../../common/button/Button";
import orderService from "../../../../services/orderService";
import { useEffect, useState } from "react";
import { useAddressInfoStore } from "../../../../stores/shoppingProgressStore";
import productService from "../../../../services/productService";
import {
  IAddressInfoStore,
  ITableItem,
  IShippingAddress,
  IOrderItems,
} from "../../../../types/orderTypes";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CartStore from "../../../../stores/cartStore";

const ShoppingSummary = () => {
  const headers = ["عکس", "نام محصول", "تعداد", "قیمت", "قیمت نهایی"];
  const navigate = useNavigate();
  const { cartItems } = CartStore();
  const [Items, setItems] = useState<ITableItem[]>([]);
  const [orderItems, setorderItems] = useState<IOrderItems[]>([]);
  const [travelPay] = useState(10000);

  const calcSummaryItems = () => {
    const total = Items.map(
      (item) => Number(item.price) * Number(item.تعداد)
    ).reduce((acc, cur) => acc + cur, 0);

    return total;
  };
  const SummaryPrice = calcSummaryItems();
  const calcSummary = {
    SummaryPrice,
    tax: SummaryPrice * 0.1,
    totalPrice: SummaryPrice + travelPay + SummaryPrice * 0.1,
  };

  const summaryItems = [
    {
      label: "قیمت محصولات",
      value: `${calcSummary.SummaryPrice.toLocaleString("fa-IR")} تومان`,
    },
    {
      label: "هزینه ارسال",
      value: `${travelPay.toLocaleString("fa-IR")} تومان`,
    },
    {
      label: "مالیات",
      value: `${calcSummary.tax.toLocaleString("fa-IR")} تومان`,
    },
    {
      label: "مبلغ نهایی",
      value: `${calcSummary.totalPrice.toLocaleString("fa-IR")} تومان`,
    },
  ];
  const { address, city, postalCode, paymentMethod }: IAddressInfoStore =
    useAddressInfoStore();
  const [shippingAddress] = useState<IShippingAddress>({
    city,
    address,
    postalCode,
  });
  const getProducts = async (id: string) => {
    const prouduct = await productService.getProduct(id);
    return prouduct;
  };

  const getorederlist = async () => {
    try {
      const products = await Promise.all(
        cartItems.map(async(item) =>{
          const otherInfo=await getProducts(item._id)
         return  {...item, ...otherInfo}
    }));
      const items = products.map((product) => ({
        price: product.price,
        عکس: product.image,
        "نام محصول": product.name,
        تعداد: product.qty|| 1 ,
        قیمت: product.price.toLocaleString('fa-IR'),
        "قیمت نهایی":(product.qty * product.price).toLocaleString('fa-IR'),
    }));
      setItems(items);
      setorderItems(cartItems);
    } catch (error) {
      toast.error(`لطفا مجدد تلاش کنید! : ${error}`);
    }
  };
  const createOrder = async () => {
    try {
      const order = await orderService.createOrder(
        orderItems,
        paymentMethod,
        shippingAddress
      );
      navigate(`/checkout/${order._id}`);
      toast.success("سفارش شما با موفقیت ثبت شد");
    } catch (error) {
      toast.error("لطفا مجدد تلاش کنید! ");
      console.error(error);
    }
  };

  const infoItems = [
    { label: "روش پرداخت", value: paymentMethod },
    {
      label: "آدرس دریافت",
      value: `${shippingAddress.city} ${shippingAddress.address} ${shippingAddress.postalCode}`,
    },
  ];
  useEffect(() => {
    getorederlist();
  }, [cartItems]);

  useEffect(() => {
    getorederlist();
  }, []);

  return (
    <>
      <Toaster />
      <div className=" w-full h-full flex justify-center items-center">
        <div className=" w-full flex flex-col justify-center items-center gap-20">
          <div className=" w-5/6  gap-16 flex flex-col ">
            <Table
              optionalWidth="w-full"
              optionalHeight="h-fit"
              items={Items}
              headers={headers}
            />
            <div className=" h-[30rem] gap-8 w-full flex flex-col justify-between items-center">
              <p className="w-full h-12 text-[2.4rem] leading-10 font-medium dark:text-dark-text-primary">
                خلاصه خرید
              </p>
              <div className="bg-base-side dark:bg-dark-base-side w-full  flex flex-row justify-between items-center p-12 rounded-xl">
                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col h-28 gap-6 justify-center items-start w-1/4"
                  >
                    <p className="h-12 text-[2.4rem] leading-10 font-medium dark:text-dark-text-primary">
                      {item.label}
                    </p>
                    <span className="text-text-secondary dark:text-dark-text-secondary text-[1.6rem] font-bold">
                      {item.label.split(" ")[0]}:
                      <span className="text-text-primary dark:text-dark-text-primary text-[1.6rem] font-normal">
                        {item.value}
                      </span>
                    </span>
                  </div>
                ))}

                <div className="flex flex-col justify-between items-center gap-2">
                  {summaryItems.map(({ label, value }) => (
                    <div
                      className="w-full flex flex-row justify-between items-start  text-[1.6rem] leading-10 h-10"
                      key={label}
                    >
                      <p className="text-text-secondary dark:text-dark-text-secondary font-bold">{label} :</p>
                      <p className="text-text-primary dark:text-dark-text-primary font-normal">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                onClick={createOrder}
                className="bg-primary-main rounded-2xl font-bold py-3 px-12 h-20 w-full leading-10 text-text-button text-[2rem]"
              >
                ثبت سفارش
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingSummary;
