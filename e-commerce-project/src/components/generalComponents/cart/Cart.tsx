import CardInfo from "./cardInfo/CardInfo";
import Button from "../../common/button/Button";
import CartStore from "../../../stores/cartStore";
import { useEffect, useState } from "react";
import productService from "../../../services/productService";
import { useNavigate } from "react-router-dom";
import categoryService from "../../../services/categoryService";
import emptyCart from "../../../assets/images/empty-cart.png";
import { FaArrowLeftLong } from "react-icons/fa6";

interface Product {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  category: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Review {
  name: string;
  rating: number;
  comment: string;
  user: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const cartItems = CartStore((state) => state.cartItems);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      const productData = await Promise.all(
        cartItems.map(async (item) => {
          const product = await productService.getProduct(item._id);
          const category = await categoryService.getCategory(product.category);
          return { ...product, category: category.name };
        })
      );
      setProducts(productData);
    };

    if (cartItems.length > 0) {
      fetchProductData();
    } else {
      setProducts([]);
    }
  }, [cartItems]);

  const handleClick = () => {
    navigate("/shoppingProgress");
  };

  const navigateToShop = () => {
    navigate("/shop")
  }

  if(cartItems.length) {
    return (
      <div className="h-full flex justify-center items-center mx-[20rem]">
        <div className="w-[90%] h-[48.4rem] gap-[3.2rem] flex flex-col">
          <div className="p-6 w-full flex flex-col gap-5 h-[60%] overflow-auto">
            {products.map((product) => (
              <CardInfo
                key={product._id}
                img={product.image}
                productName={product.name}
                productCategory={product.category}
                productPrice={product.price}
                optionCount={product.countInStock}
                productId={product._id}
              />
            ))}
          </div>
          <div className="w-[50%] h-[40%] flex flex-col justify-between">
            <p className="text-[2rem] font-medium font-Iran-Yekan text-text-primary dark:text-dark-text-primary">
              تعداد ({products.length.toLocaleString('fa-IR')})
            </p>
            <p className="font-Iran-Yekan text-text-primary text-[2.4rem] dark:text-dark-text-primary">
              {products.reduce((total, product) => total + product.price, 0).toLocaleString('fa-IR')}{" "}
              تومان
            </p>
            <Button
              onClick={handleClick}
              className="bg-primary-main rounded-full text-text-button font-bold text-[2rem] py-3"
            >
              تکمیل خرید
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center">
      <img src={emptyCart} alt="empty-cart" className="w-1/5" />
      <p className="text-[1.6rem] text-text-primary dark:text-dark-text-primary mb-6">سبد خرید شما خالی است.</p>
      <button 
        className="bg-primary-main py-3 px-8 rounded-full text-[1.6rem] text-text-button flex items-center gap-3"
        onClick={navigateToShop}
      >
        فروشگاه
        <FaArrowLeftLong />
      </button>
    </div>
    )
  }
};

export default Cart;
