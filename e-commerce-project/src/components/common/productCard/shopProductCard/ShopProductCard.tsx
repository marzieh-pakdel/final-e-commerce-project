import React, { useState } from "react";
import Badge from "../../badge/Badge";
import Button from "../../button/Button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import LikeIcon from "../../../generalComponents/product/likeIcon/LikeIcon";
import { useFavoritesStore } from "../../../../stores/favoritesStore";
import CartStore from "../../../../stores/cartStore";
import toast, { Toaster } from "react-hot-toast";

interface IProductCard {
  id: string;
  productImg: string;
  productTitle: string;
  badgeTitle: number;
  brandTitle?: string;
  description: string;
  flexOptional: string;
  heightOptional: string;
}

const ShopProductCard: React.FC<IProductCard> = ({
  id,
  productTitle,
  productImg,
  badgeTitle,
  brandTitle,
  description,
  flexOptional,
  heightOptional,
}) => {
  const { favoriteProductsId, addToFavorites, removeFromFavorites } = useFavoritesStore()
  const [isLiked, setIsLiked] = useState(favoriteProductsId.includes(id));
  const { cartItems, addItem } = CartStore();

  const navigate = useNavigate();

  const shiftToSelected = () => {
    navigate(`/product/${id}`);
  };
  
  const handleLikeIcon = () => {
    if (isLiked) {
        removeFromFavorites(id);
    } else {
        addToFavorites(id);
    }
    
    setIsLiked(!isLiked);
  };

  const handleClick = () => {
   try{
    const isExist = cartItems.find((item) => item._id === id)
    if (isExist) {
      toast.error("کالا در سبد خرید موجود است")
    } else {
      addItem(id, productTitle);
      toast.success("محصول به سبد خرید شما اضافه شد")
    }
   }catch(error){
    console.error("Error occurred:", error);
    toast.error("لطفا مجدد تلاش کنید")
   }
  };

  return (
    <>
    <Toaster/>
    <div
      className={`rounded-[0.8rem] overflow-hidden flex ${flexOptional} w-full ${heightOptional} justify-between items-center`}
    >
      <div className="relative flex bg-white flex-col w-full h-1/2 gap-4 justify-between items-center">
        <img
          className="relative w-full overflow-hidden max-h-1/2 object-contain rounded-md"
          src={productImg}
          alt={productTitle}
        />
        <div className="absolute top-[-9rem] left-[17rem]">
          <LikeIcon handleLikeIcon={handleLikeIcon} isLiked={isLiked} />
        </div>
        {brandTitle && (
          <div className="absolute bottom-6 right-6">
            <Badge padding="px-2.5" fontSize="text-[1.2rem]">
              {brandTitle}
            </Badge>
          </div>
        )}
      </div>
      <div className="bg-base-card dark:bg-dark-base-card flex flex-col justify-center items-center w-full h-1/2">
        <div className="w-[90%] h-14 flex-row flex justify-between">
          <p className="w-[70%] h-11 font-normal text-[1.5rem] font-Segoe leading-10 text-text-primary dark:text-dark-text-primary">
            {productTitle}
          </p>
          <p className="font-bold text-xl w-fit text-primary-main">
            {badgeTitle}
          </p>
        </div>
        <p className="line-clamp-2 font-normal text-2xl w-[90%] text-text-secondary dark:text-dark-text-secondary">
          {description}
        </p>
        <div className="h-20 w-[90%] pt-5 flex-row flex justify-between">
          <Button
            onClick={shiftToSelected}
            className="w-[45%] h-14 rounded-xl  text-text-button px-5 py-3 bg-primary-main font-normal text-lg text-center flex flex-row justify-center items-center"
            >
            مشاهده بیشتر
            <span>
              <GoArrowLeft />
            </span>
          </Button>
          <AiOutlineShoppingCart size={30} onClick={handleClick} className="cursor-pointer dark:text-dark-text-primary" />
        </div>
      </div>
    </div>
  </>
  );
};

export default ShopProductCard;
