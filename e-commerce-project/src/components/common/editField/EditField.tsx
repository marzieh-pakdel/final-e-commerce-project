import { useState } from "react";
import { BiCheck, BiEditAlt } from "react-icons/bi";
import { Toaster, toast } from "react-hot-toast";
import Input from "../input/Input";
import { useUpdateUser } from "../../../hook/useUpdateUser";

interface IEditField {
  title: string;
  type: string;
  userid: string;
}

const EditField: React.FC<IEditField> = ({ title, type, userid }) => {
  const [text, setText] = useState(title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const updateMutation = useUpdateUser();

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const validateInput = (value: string) => {
    if (type === "username") {
      if (!value) return "نام الزامیست";
      if (value.length < 3) return "نام باید حداقل دارای 3 کارکتر باشد";
      if (value.length > 20) return "نام میتواند حداکثر 20 کارکتر داشته باشد";
      if (/\s/.test(value)) return "نام نباید شامل فاصله باشد";
    } else if (type === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return "ایمیل الزامیست";
      if (!emailPattern.test(value)) return "لطفاً یک ایمیل معتبر وارد کنید";
    }
    return null; // No error
  };

  const handleBlur = () => {
    const validationError = validateInput(text);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsEditing(false);
    if (text !== title) {
      updateMutation.mutate(
        type === "username"
          ? { id: userid, updateparam: { username: text } }
          : { id: userid, updateparam: { email: text } },
        {
          onSuccess: () => {
            toast.success("ثبت شد");
          },
          onError: (error) => {
            toast.error("فیلتر شکن خود را خاموش کنید");
            console.log("Register Failed :", error);
          },
        }
      );
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col">
        {isEditing ? (
          <div className="flex flex-row gap-2 items-center">
            <div className="p-[0.7rem] bg-info-main rounded-xl text-text-button">
              <BiCheck
                onClick={handleBlur}
                style={{ cursor: "pointer" }}
                size={24}
              />
            </div>
            <Input
              value={text}
              inputStyle="w-[20rem] text-[1.6rem] text-text-primary leading-10 font-normal dark:text-dark-text-primary rounded-[0.8rem] px-[0.7rem] py-[0.7rem]"
              labelStyle={""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <BiEditAlt
              onClick={handleEditClick}
              style={{ cursor: "pointer" }}
              size={24}
            />
            <p className="text-[1.6rem] text-text-primary leading-10 font-normal dark:text-dark-text-primary">
              {text}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default EditField;
