import { FaStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdInventory } from "react-icons/md";
import { TbBrandAppgallery } from "react-icons/tb";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import LikeIcon from "./likeIcon/LikeIcon";
import Button from "../../common/button/Button";
import { Link } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axiosClient from "../../../api/axiosClient";
import categoryService from "../../../services/categoryService";
import { useParams } from "react-router-dom";
import Score from "./score/Score";
import CartStore from "../../../stores/cartStore";
import { useFavoritesStore } from "../../../stores/favoritesStore";
import toast, { Toaster } from "react-hot-toast";

interface IProductProps {
  children: ReactNode;
}

const Product: React.FC<IProductProps> = ({ children }) => {
  const { favoriteProductsId, addToFavorites, removeFromFavorites } =
    useFavoritesStore();

  const addItem = CartStore((state) => state.addItem);
  const items = CartStore((state) => state.cartItems);
  const { id } = useParams();
  const [brand, setBrand] = useState("");

  const [isLiked, setIsLiked] = useState(
    favoriteProductsId.includes(String(id))
  );

  const { isLoading, data: selectProduct } = useQuery({
    queryKey: ["selectProduct"],
    queryFn: () => fetchProduct(),
  });

  const fetchProduct = async () => {
    const res = await axiosClient.get(`/products/${id}`);
    return res.data;
  };

  const handleLikeIcon = () => {
    if (isLiked) {
      removeFromFavorites(String(id));
    } else {
      addToFavorites(String(id));
    }

    setIsLiked(!isLiked);
  };

  const fetchCategory = async () => {
    if (selectProduct?.category) {
      const res = await categoryService.getCategory(selectProduct.category);
      setBrand(res.name);
    }
  };

  useEffect(() => {
    if (selectProduct) {
      fetchCategory();
    }
  }, [selectProduct]);

  
  const handleClick = () => {
    try{
     const isExist = items.find((item) => item._id === id)
     if (isExist) {
       toast.error("کالا در سبد خرید موجود است")
     } else {
       addItem(selectProduct._id, selectProduct.name);
       toast.success("محصول به سبد خرید شما اضافه شد")
     }
    }catch(error){
     console.error("Error occurred:", error);
     toast.error("لطفا مجدد تلاش کنید")
    }
   };

  if (isLoading) {
    return (
      <div className="text-green-600 w-full h-full flex justify-center items-center text-5xl">
        <h1>...Loading</h1>
      </div>
    );
  }

  return (
    <>
      <div className=" flex flex-col w-[90%] h-full gap-5 justify-start items-center ">
        <LikeIcon handleLikeIcon={handleLikeIcon} isLiked={isLiked} />

        <div className="w-[90%] h-[80%] flex justify-between items-center mt-[9.5rem] mx-auto">
          <img
            src={selectProduct.image}
            alt={selectProduct.name}
            className="w-[45%] h-full rounded-[0.8rem]"
          />
          <div className=" w-[55%] h-full flex flex-col px-28 justify-between ">
            <p className="font-Iran-Yekan font-medium text-[2.4rem] text-text-primary dark:text-dark-text-primary text-right">
              {selectProduct.name}
            </p>
            <p className="text-text-primary dark:text-dark-text-primary font-normal text-[1.6rem] text-right">
              {selectProduct.description}
            </p>
            <p className="text-text-primary dark:text-dark-text-primary text-right text-[4.8rem] font-medium font-Iran-Yekan">
              {selectProduct.price.toLocaleString("fa-IR")}
            </p>
            <div className="flex justify-between items-center font-normal text-[1.6rem]">
              <div className="flex flex-col justify-center items-start gap-6">
                <div className="flex justify-center items-center gap-1">
                  <FaStar className="inline dark:text-dark-text-primary" />
                  <span className="text-text-secondary dark:text-dark-text-secondary">امتیاز:</span>
                  <span className="dark:text-dark-text-primary">{(selectProduct.rating).toFixed(1)}</span>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <FaCartShopping className="inline dark:text-dark-text-primary" />
                  <span className="text-text-secondary dark:text-dark-text-secondary">تعداد:</span>
                  <span className="dark:text-dark-text-primary">{selectProduct.quantity.toLocaleString("fa-IR")}</span>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <MdInventory className="inline dark:text-dark-text-primary" />
                  <span className="text-text-secondary dark:text-dark-text-secondary">موجودی:</span>
                  <span className="dark:text-dark-text-primary">{selectProduct.countInStock.toLocaleString("fa-IR")}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start gap-6">
                <div className="flex justify-center items-center gap-1">
                  <TbBrandAppgallery className="inline dark:text-dark-text-primary" />
                  <span className="text-text-secondary dark:text-dark-text-secondary">برند:</span>
                  <span className="dark:text-dark-text-primary">{brand}</span>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <MdOutlineAccessTimeFilled className="inline dark:text-dark-text-primary" />
                  <span className="text-text-secondary dark:text-dark-text-secondary">زمان بروزرسانی:</span>
                  <span className="dark:text-dark-text-primary">
                    {new Date(selectProduct.updatedAt).toLocaleDateString(
                      "fa-IR"
                    )}
                  </span>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <FaStar className="inline dark:text-dark-text-primary" />
                  <span className="text-text-secondary dark:text-dark-text-secondary">نظرات:</span>
                  <span className="dark:text-dark-text-primary">{selectProduct?.numReviews.toLocaleString("fa-IR")}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex justify-center items-center gap-2">
                <p className="font-normal text-[1.6rem] text-text-primary dark:text-dark-text-primary">
                  {selectProduct?.numReviews.toLocaleString("fa-IR")} نظر
                </p>
                <Score count={Math.round(selectProduct.rating)} />
              </div>
              <select className="w-[9.6rem] h-[4rem] dark:bg-dark-base-text-field border border-base-text-field-stroke dark:border-dark-base-text-field-stroke rounded-[0.8rem] p-[0.8rem] text-[1.6rem] dark:text-dark-text-primary">
                {[...Array(selectProduct.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleClick}
              className=" bg-primary-main text-text-button w-[14.3rem] h-[4rem] rounded-[0.8rem] text-center py-[0.8rem] px-[1.2rem]"
              >
              افزودن به سبد خرید
            </Button>
          </div>
        </div>
        <div className="w-[90%] h-[80%] flex justify-center items-start mx-auto p-5 gap-20">
          <div className=" h-full text-[1.6rem] text-text-primary dark:text-dark-text-primary flex flex-col gap-4 w-[10%]">
            <Link to={`/product/${selectProduct._id}/reviews`}>ثبت نظر</Link>
            <Link to={`/product/${selectProduct._id}/comments`}>
              مشاهده نظرات
            </Link>
            <Link to={`/product/${selectProduct._id}/related-products`}>
              محصولات مرتبط
            </Link>
          </div>
          <div className="w-[90%] h-[90%]">{children}</div>
        </div>
      </div>
      <Toaster/>
    </>
  );
};

export default Product;
