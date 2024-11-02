import { adminStore } from "../../../stores/adminStore";
import Button from "../button/Button";
import { IInformation } from "../../../types/orderTypes";
interface IStatusProps {
  isNeedButton: boolean;
  information: IInformation;
  status: string;
  isPaid?: boolean;
  isDelivered?: boolean;
  makePay?: () => void;
  makeDeliver?: () => void;
  handleNavigate?: () => void;
}

const Status: React.FC<IStatusProps> = ({
  isNeedButton,
  information,
  status,
  isPaid,
  isDelivered,
  makePay,
  makeDeliver,
  handleNavigate,
}) => {
  const isAdmin = adminStore((state) => state.isAdmin);

  const infoItems = [
    { label: "شماره سفارش", value: information._id },
    { label: "نام", value: information.name },
    { label: "ایمیل", value: information.email },
    { label: "آدرس", value: information.address },
    { label: "روش پرداخت", value: "درگاه پرداخت پاسارگاد" },
  ];

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} تومان`;
  };

  const summaryItems = [
    {
      label: "قمیت محصولات",
      value: formatPrice(
        information.totalPrice -
          (information.shippingPrice + information.taxPrice)
      ),
    },
    { label: "هزینه ارسال", value: formatPrice(information.shippingPrice) },
    { label: "مالیات", value: formatPrice(information.taxPrice) },
    { label: "مبلغ نهایی", value: formatPrice(information.totalPrice) },
  ];

  const textStyle = "text-[1.6rem] font-normal text-text-primary dark:text-dark-text-primary py-2";
  const boldTextStyle = "text-[1.6rem] font-bold text-text-secondary py-2";

  const buttonCondition = () => {
    if (isAdmin) {
      if (!isPaid) {
        return (
          <Button
            onClick={makePay}
            className="bg-primary-main text-text-button text-center w-full rounded-full py-[0.8rem] px-[3.2rem] font-medium text-[2rem]"
          >
            پرداخت
          </Button>
        );
      } else if (isPaid && !isDelivered) {
        return (
          <Button
            onClick={makeDeliver}
            className="bg-primary-main text-text-button text-center w-full rounded-full py-[0.8rem] px-[3.2rem] font-medium text-[2rem]"
          >
            ارسال
          </Button>
        );
      } else if (isPaid && isDelivered) {
        return (
          <Button
            dis={true}
            className="bg-primary-main text-text-button text-center w-full rounded-full py-[0.8rem] px-[3.2rem] font-medium text-[2rem]"
          >
            ارسال شده
          </Button>
        );
      }
    } else {
      return (
        <Button
          onClick={handleNavigate}
          className="bg-primary-main text-text-button text-center w-full rounded-full py-[0.8rem] px-[3.2rem] font-medium text-[2rem]"
        >
          پرداخت
        </Button>
      );
    }
  };

  return (
    <div className="w-[50%] h-[90%] font-Iran-Yekan">
      <p className="font-medium text-[2rem] dark:text-dark-text-primary">آدرس دریافت</p>
      <div className="text-primary-main font-bold text-[1.6rem] flex flex-col gap-4 my-4">
        {infoItems.map(({ label, value }) => (
          <p key={label}>
            {label} : <span className={textStyle}>{value}</span>
          </p>
        ))}
      </div>
      <div className="text-[1.6rem] font-bold border border-base-text-field-stroke dark:border-dark-base-text-field-stroke text-text-primary dark:text-dark-text-primary w-full bg-base-card dark:bg-dark-base-card rounded-md pr-4 py-3">
        {status}
      </div>
      <p className="font-medium text-[2rem] dark:text-dark-text-primary my-4">خلاصه خرید</p>
      {summaryItems.map(({ label, value }) => (
        <div key={label} className="flex justify-between items-center w-full">
          <p className={boldTextStyle}>{label} :</p>
          <p className={textStyle}>{value}</p>
        </div>
      ))}
      {isNeedButton ? buttonCondition() : null}
    </div>
  );
};

export default Status;
