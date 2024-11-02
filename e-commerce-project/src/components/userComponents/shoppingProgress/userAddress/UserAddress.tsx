import { useForm, FieldValues } from "react-hook-form";
import Input from "../../../common/input/Input";
import Button from "../../../common/button/Button";
import RadioButton from "../../../common/radioButton/RadioButton";
import {
  useStepperStore,
  useAddressInfoStore,
} from "../../../../stores/shoppingProgressStore";
import { useEffect } from "react";

const UserAddress = () => {
  const { setStep } = useStepperStore();
  const {
    address,
    city,
    country,
    postalCode,
    paymentMethod,
    setAddress,
    setCity,
    setCountry,
    setPostalCode,
    setPaymentMethod,
  } = useAddressInfoStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  const increaseStep = () => {
    setStep(3);
  };

  const onSubmit = (data: FieldValues) => {
    setAddress(data.address);
    setCity(data.city);
    setCountry(data.country);
    setPostalCode(data.postalCode);
    increaseStep();
  };

  useEffect(() => {
    setFocus("address");
  }, [setFocus]);

  const labelStyler = "text-black text-2xl block";
  const inputStyler =
    "w-full rounded-xl p-4 text-right bg-white text-black block focus:outline-secondary-main";
  const containerStyle = "flex flex-col gap-[0.8rem] w-full";

  return (
    <div className="m-auto flex w-5/6  flex-col">
      <p className="text-black dark:text-dark-text-primary text-[2.4rem] font-medium mb-[1.6rem]">خرید</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <div className={containerStyle}>
          <Input
            {...register("address", {
              required: "آدرس الزامیست",
            })}
            id="address"
            placeholder="آدرس را وارد نمایید"
            label="آدرس"
            inputStyle={inputStyler}
            labelStyle={labelStyler}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          {errors.address && (
            <p className="text-red-600 text-[1.6rem]">
              {errors.address.message as string}
            </p>
          )}
        </div>
        <div className={containerStyle}>
          <Input
            {...register("city", {
              required: "نام شهر خود را بنویسید",
            })}
            id="city"
            placeholder="شهر را وارد نمایید"
            label="شهر"
            inputStyle={inputStyler}
            labelStyle={labelStyler}
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          {errors.city && (
            <p className="text-red-600 text-[1.6rem]">
              {errors.city.message as string}
            </p>
          )}
        </div>
        <div className={containerStyle}>
          <Input
            {...register("country", {
              required: "نام کشور خود را وارد کنید",
            })}
            id="country"
            placeholder="کشور را وارد نمایید"
            label="کشور"
            inputStyle={inputStyler}
            labelStyle={labelStyler}
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
          {errors.country && (
            <p className="text-red-600 text-[1.6rem]">
              {errors.country.message as string}
            </p>
          )}
        </div>
        <div className={containerStyle}>
          <Input
            {...register("postalCode", {
              required: "کد پستی الزامیست",
            })}
            id="postalCode"
            placeholder="کد پستی را وارد نمایید"
            label="کد پستی"
            inputStyle={inputStyler}
            labelStyle={labelStyler}
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
          />
          {errors.postalCode && (
            <p className="text-red-600 text-[1.6rem]">
              {errors.postalCode.message as string}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-[0.8rem]">
          <p className="text-text-secondary dark:text-dark-text-secondary text-[1.6rem]">روش پرداخت</p>
          <RadioButton
            name="bank"
            options={[
              {
                value: "درگاه پرداخت بانک پاسارگاد",
                label: "درگاه پرداخت بانک پاسارگاد",
              },
            ]}
            checked={paymentMethod}
            onChange={setPaymentMethod}
          />
        </div>
        <Button
          className="w-full rounded-full bg-[#DB2777] hover:bg-[#831747] text-center text-[1.6rem] text-text-button content-center py-[0.8rem]"
          children="ادامه"
        />
      </form>
    </div>
  );
};

export default UserAddress;
