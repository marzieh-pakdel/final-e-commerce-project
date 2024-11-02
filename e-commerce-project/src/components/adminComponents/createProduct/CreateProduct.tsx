import { useForm, FieldValues } from "react-hook-form";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import { useState } from "react";
import productService from "../../../services/productService";
import uploadService from "../../../services/uploadService";
import { IProductType } from "../../../types/productTypes";
import categoryService from "../../../services/categoryService";

const CreateProduct = () => {
  const { register, handleSubmit } = useForm();
  const [selectedImage, setSelectedImage] = useState<Blob | MediaSource>();

  const createProduct = async (form: IProductType) => {
    return await productService.createProduct(form);
  };

  const createCategory = async (cat: string) => {
    return await categoryService.createCategory(cat);
  };

  const onSubmit = async (data: FieldValues) => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage as string | Blob);
      const uploadedImageUrl = await uploadService.uploadImage(formData);
      const category = await createCategory(data.category);

      const form = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: category._id,
        quantity: data.purchasableCount,
        image: uploadedImageUrl.image,
      };

      await createProduct(form);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file);
    const formData = new FormData();
    formData.append("image", file as string | Blob);
  };

  return (
    <div className="flex flex-col justify-start items-start w-[70%] mx-auto my-[10.6rem] gap-[3.2rem]">
      <p className="text-text-primary dark:text-dark-text-primary text-2xl font-medium mb-12">
        محصول جدید
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col gap-6 text-[1.6rem]"
      >
        <div className="flex flex-col justify-center items-center gap-10">
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Product Image"
              className="max-w-[80rem] max-h-[48rem] m-auto"
            />
          )}
          <input
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
            {...register("image")}
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className=" flex flex-row justify-center items-center w-full bg-white h-[12.4rem] border border-gray-300  border-dashed text-text-secondary text-center rounded-md dark:bg-dark-base-text-field dark:text-dark-text-secondary dark:border-dark-base-text-field-stroke"
          >
            آپلود عکس
          </label>
        </div>
        <div className="h-full w-full">
          <Input
            {...register("name")}
            id="productName"
            placeholder="نام محصول را وارد نمایید"
            label="نام"
            inputStyle="block w-full rounded-xl p-4 text-right bg-white text-black block border border-base-text-field-stroke"
            labelStyle=" text-black text-2xl block mb-5 w-full"
          />
        </div>
        <div className="flex justify-between items-center gap-5 ">
          <div className="w-[50%]">
            <Input
              {...register("price")}
              id="price"
              placeholder="قیمت محصول را وارد نمایید"
              label="قیمت"
              inputStyle="bg-white w-full px-[0.9rem] py-[1rem] rounded-xl text-[1.6rem] border border-base-text-field-stroke"
              labelStyle="block text-[1.6rem] pb-3 pt-3"
            />
          </div>
          <div className="w-[50%]">
            <Input
              {...register("category")}
              id="brand"
              placeholder="برند محصول را وارد نمایید"
              label="برند"
              inputStyle="bg-white w-full px-[0.9rem] py-[1rem] rounded-xl text-[1.6rem] border border-base-text-field-stroke"
              labelStyle="block text-[1.6rem] pb-3 pt-3"
            />
          </div>
        </div>
        <div className="h-[17.5rem] w-full">
          <label
            htmlFor="info"
            className=" text-black text-2xl block mb-5 w-full dark:text-dark-text-primary"
          >
            توضیحات
          </label>
          <textarea
            {...register("description")}
            id="info"
            placeholder="توضیحات محصول را وارد نمایید"
            className="w-full rounded-xl h-[14rem] p-4 text-right bg-white text-black block resize-none border border-base-text-field-stroke dark:bg-dark-base-text-field dark:text-dark-text-secondary dark:border-dark-base-text-field-stroke dark:focus:border-secondary-main"
          ></textarea>
        </div>
        <div className="flex flex-row-reverse justify-between items-center gap-10">
          <div className="flex flex-col w-[50%] gap-5">
            <label
              htmlFor="select"
              className=" text-text-primary text-[1.6rem] block dark:text-dark-text-primary"
            >
              موجودی
            </label>
            <select
              {...register("quantity")}
              id="select"
              className="w-full text-right bg-base-text-field text-text-secondary dark:text-dark-text-secondary p-4 text-[1.6rem] rounded-[0.8rem] border border-base-text-field-stroke dark:bg-dark-base-text-field dark:border-dark-base-text-field-stroke"
            >
              <option value="موجودی" disabled>
                موجودی
              </option>
              <option value="موجودی">1</option>
              <option value="موجودی">2</option>
              <option value="موجودی">3</option>
              <option value="موجودی">4</option>
              <option value="موجودی">5</option>
              <option value="موجودی">6</option>
              <option value="موجودی">7</option>
              <option value="موجودی">8</option>
              <option value="موجودی">9</option>
              <option value="موجودی">10</option>
            </select>
          </div>
          <div className="w-[50%] flex flex-col gap-5">
            <Input
              {...register("purchasableCount")}
              id="purchasableCount"
              placeholder="تعداد قابل خرید را وارد نمایید"
              label="تعداد قابل خرید"
              inputStyle="w-full text-right bg-base-text-field text-text-secondary p-4 text-[1.6rem] rounded-[0.8rem] border border-base-text-field-stroke"
              labelStyle="text-text-primary text-[1.6rem] block"
            />
          </div>
        </div>
        <Button className="w-[14.6rem] bg-primary-main rounded-[0.8rem] text-center inline text-[1.4rem] text-text-button py-[0.8rem] px-[1.2rem] ">
          ساخت محصول جدید
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
