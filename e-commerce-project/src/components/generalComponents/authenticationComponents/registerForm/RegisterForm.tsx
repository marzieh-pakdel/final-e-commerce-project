import { Link } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import { useEffect } from "react";
import Input from "../../../common/input/Input";
import Button from "../../../common/button/Button";
import { useRegister } from "../../../../hook/useRegister";
import toast, { Toaster } from "react-hot-toast";
const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setFocus,
  } = useForm();

  const registerMutation = useRegister();

  const onSubmit = (data: FieldValues) => {
    const {
      name: username,
      email,
      password,
      passwordCheck: confirm_Password,
    } = data;

    registerMutation.mutate(
      { username, email, password, confirm_Password },
      {
        onSuccess: () => {
          toast.success("ثبت نام با موفقیت انجام شد");
        },
        onError: (error) => {
          toast.error("فیلتر شکن خود را خاموش کنید");
          console.log("Register Failed :", error);
        },
      }
    );
  };

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const password = watch("password");

  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-6  w-[53.1rem] h-[35.6rem]">
        <h1 className="text-text-primary dark:text-dark-text-primary text-[2rem] font-bold">ثبت نام</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name", {
              required: "نام الزامیست",
              minLength: {
                value: 3,
                message: "نام باید حداقل دارای 3 کارکتر باشد",
              },
              maxLength: {
                value: 20,
                message: "نام میتواند حداکثر 20 کارکتر داشته باشد",
              },
              pattern: {
                value: /^[^\s]+$/,
                message: "نام نباید شامل فاصله باشد",
              },
            })}
            inputStyle="bg-white w-full h-[4.2rem] px-[0.9rem] py-[1rem] rounded-xl outline-none text-[1.6rem]"
            id="name"
            labelStyle="block text-[1.6rem] pb-3 pt-3"
            placeholder="نام خود را وارد نمایید"
            label="نام"
            type="text"
          />
          {errors.name && (
            <p className="text-red-600 text-[1.6rem]">
              {errors.name.message as string}
            </p>
          )}

          <Input
            {...register("email", {
              required: "ایمیل الزامیست",
              pattern: {
                value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                message: "آدرس ایمیل وارد شده درست نیست",
              },
            })}
            inputStyle="bg-white w-full h-[4.2rem] px-[0.9rem] py-[1rem] rounded-xl outline-none text-[1.6rem]"
            id="email"
            labelStyle="block text-[1.6rem] pb-3 pt-3"
            placeholder="ایمیل خود را وارد نمایید"
            label="ایمیل"
            type="email"
          />
          {errors.email && (
            <p className="text-red-600 text-[1.6rem]">
              {errors.email.message as string}
            </p>
          )}

          <Input
            {...register("password", {
              required: "رمز عبور الزامیست",
              minLength: {
                value: 6,
                message: "رمز عبور باید حداقل شامل 6 کارکتر باشد",
              },
              pattern: {
                value: /^[^\s]+$/,
                message: "رمز عبور نباید شامل فاصله باشد",
              },
            })}
            inputStyle="bg-white w-full h-[4.2rem] px-[0.9rem] py-[1rem] rounded-xl outline-none text-[1.6rem]"
            id="password"
            labelStyle="block text-[1.6rem] pb-3 pt-3"
            placeholder="رمز عبور خود را وارد نمایید"
            label="رمز عبور"
            type="password"
          />
          {errors.password && (
            <p className="text-red-600 text-[1.6rem]">
              {errors.password.message as string}
            </p>
          )}

          <Input
            {...register("passwordCheck", {
              required: "رمز عبور خود را تایید کنید",
              validate: (value) => value === password || "رمز ها تطابق ندارند",
            })}
            inputStyle="bg-white w-full h-[4.2rem] px-[0.9rem] py-[1rem] rounded-xl outline-none text-[1.6rem]"
            id="passwordCheck"
            labelStyle="block text-[1.6rem] pb-3 pt-3"
            placeholder="رمز عبور خود را دوباره وارد نمایید"
            label="تکرار رمز عبور"
            type="password"
          />
          {errors.passwordCheck && (
            <p className="text-red-600 text-[1.6rem]">
              {errors.passwordCheck.message as string}
            </p>
          )}

          <Button className="flex justify-center items-center bg-primary-main w-[7.4rem] h-[4.8rem] text-white rounded-lg mt-8 text-xl px-[0.8rem] py-[2.4rem]">
            عضویت
          </Button>

          <p className="block text-[1.6rem] pb-3 pt-3 dark:text-dark-text-primary">
            عضو هستید؟{" "}
            <Link to="/login" className="text-pink-600">
              ورود
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
