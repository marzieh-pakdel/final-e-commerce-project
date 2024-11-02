import { Link } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import { useEffect } from "react";
import Input from "../../../common/input/Input";
import Button from "../../../common/button/Button";
import { Toaster, toast } from "react-hot-toast";
import { useLogin } from "../../../../hook/useLogin";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm();

  const loginMutation = useLogin();

  const onSubmit = (data: FieldValues) => {
    const { email, password } = data;
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          toast.success("ورود با موفقیت انجام شد");
        },
        onError: () => {
          toast.error("ایمیل یا رمز وارد شده اشتباه است!");
        },
      }
    );
  };

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-8 w-[53.1rem] h-[35.6rem] font-Iran-Yekan">
        <h1 className="text-text-primary dark:text-dark-text-primary text-[2rem] font-bold">ورود</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", {
              required: "ایمیل الزامیست",
              pattern: {
                value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                message: "آدرس ایمیل وارد شده درست نیست",
              },
            })}
            id="email"
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            label="ایمیل"
            inputStyle="bg-white w-full h-[4.2rem] px-[0.9rem] py-[1rem] rounded-xl outline-none text-[1.6rem]"
            labelStyle="block text-[1.6rem] pb-3 pt-3"
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
            id="password"
            type="password"
            placeholder="رمز عبور خود را وارد کنید"
            label="رمز عبور"
            inputStyle="bg-white w-full h-[4.2rem] px-[0.9rem] py-[1rem] rounded-xl outline-none text-[1.6rem]"
            labelStyle="block text-[1.6rem] pb-3 pt-3"
          />
          {errors.password && (
            <p className="text-red-600 text-[1.6rem]">
              {errors.password.message as string}
            </p>
          )}

          <Button className="flex justify-center items-center bg-primary-main w-[7.4rem] h-[4.8rem] text-white rounded-lg mt-8 text-xl px-[0.8rem] py-[2.4rem]">
            ورود
          </Button>
          <p className="block text-[1.6rem] pb-3 pt-3 dark:text-dark-text-primary">
            عضو نیستید؟{" "}
            <Link to="/register" className="text-pink-600">
              ثبت نام
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
