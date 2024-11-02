import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useUpdateProfile } from "../../../hook/useUpdateProfile";

interface IFormInput {
  username: string;
  email: string;
  password?: string;
  repeatPassword?: string;
  _id?: string;
}

const Profile: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();

  const navigate = useNavigate();
  const updateMutation = useUpdateProfile();

  const getUserProfile = async () => {
    try {
      const data = await authService.getUserProfile();
      setValue("username", data.username || "");
      setValue("email", data.email || "");
      setValue("password", data.password || "");
      setValue("repeatPassword", data.repeatPassword || "");
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { username, email, password } = data;

    return updateMutation.mutate(
      { username, email, password },
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

  const navToMyOrders = () => navigate("/orders");
  const password = watch("password");

  const inputStyle =
    "bg-white w-full h-[4.2rem] px-[0.9rem] py-[1rem] rounded-xl outline-none text-[1.6rem]";
  const labelStyle = "block text-[1.6rem] pb-3 pt-3";

  return (
    <>
      <Toaster />

      <div className="w-full mt-20 items-center flex flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[64rem] gap-[1.6rem] h-[44rem] flex flex-col"
        >
          <h1 className="font-Iran-Yekan font-medium text-[2.4rem] dark:text-dark-text-primary">
            بروزرسانی پروفایل
          </h1>
          <div className="w-full gap-2 ">
            <Input
              {...register("username", {
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
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              id="username"
              placeholder="نام خود را وارد نمایید"
              label="نام"
              type="text"
            />
            {errors.username && (
              <p className="text-red-600 text-[1rem]">
                {errors.username.message as string}
              </p>
            )}
          </div>
          <Input
            {...register("email", {
              required: "ایمیل الزامیست",
              pattern: {
                value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                message: "آدرس ایمیل وارد شده درست نیست",
              },
            })}
            inputStyle={inputStyle}
            labelStyle={labelStyle}
            id="email"
            placeholder="ایمیل خود را وارد نمایید"
            label="ایمیل"
            type="email"
          />
          {errors.email && (
            <p className="text-red-600 text-[1rem]">
              {errors.email.message as string}
            </p>
          )}

          <Input
            {...register("password", {
              minLength: {
                value: 6,
                message: "رمز عبور باید حداقل شامل 6 کارکتر باشد",
              },
              pattern: {
                value: /^[^\s]+$/,
                message: "رمز عبور نباید شامل فاصله باشد",
              },
            })}
            inputStyle={inputStyle}
            labelStyle={labelStyle}
            id="password"
            placeholder="رمز عبور خود را وارد نمایید"
            label="رمز عبور"
            type="password"
          />
          {errors.password && (
            <p className="text-red-600 text-[1rem]">
              {errors.password.message as string}
            </p>
          )}

          <Input
            {...register("repeatPassword", {
              validate: (value) => value === password || "رمز ها تطابق ندارند",
            })}
            inputStyle={inputStyle}
            labelStyle={labelStyle}
            id="repeatPassword"
            placeholder="رمز عبور خود را دوباره وارد نمایید"
            label="تکرار رمز عبور"
            type="password"
          />
          {errors.repeatPassword && (
            <p className="text-red-600 text-[1rem]">
              {errors.repeatPassword.message as string}
            </p>
          )}
          <div className="w-full h-[3.6rem] justify-between items-center flex flex-row">
            <Button
              onClick={navToMyOrders}
              children="سفارشات من"
              className="rounded-lg py-[0.8rem] px-[1.2rem] text-center bg-primary-main text-text-button text-[1.4rem]"
            />
            <Button
              children="بروزرسانی"
              className="rounded-lg py-[0.8rem] px-[1.2rem] text-center bg-primary-main text-text-button text-[1.4rem]"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
