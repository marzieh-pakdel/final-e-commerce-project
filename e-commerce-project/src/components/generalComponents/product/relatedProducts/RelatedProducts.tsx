import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "../../../../services/productService";
import { IProductType } from "../../../../types/productTypes";
import ProductCard from "../../../common/productCard/ProductCard";
import noproducts from "../../../../assets/images/no-products.png";
interface Product {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  category: {
    _id: string;
    name: string;
    __v: number;
  };
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

const RelatedProducts = () => {
  const [category, setCategory] = useState<string>("");
  const [relatedProducts, setRelatedProduct] = useState([]);
  const { id } = useParams();

  const fetchCategory = async () => {
    const res = await productService.getProduct(String(id));
    setCategory(res.category);
  };
  const fetchfilterbrand = async () => {
    const response = await productService.getAllProducts();
    const arr = response?.filter((res: Product) => {
      if (res.category?._id === category && res._id !== id) {
        return res;
      }
    });
    setRelatedProduct(arr);
  };

  useEffect(() => {
    const fetchRealateProducts = async () => {
      await fetchCategory();

      if (category) {
        await fetchfilterbrand();
      }
    };

    fetchRealateProducts();
  }, [category, id]);

  {
    if (relatedProducts.length) {
      return (
        <div className="w-[45%] grid grid-cols-2 grid-rows-2 gap-[3.2rem]">
          {relatedProducts.map((item: IProductType, index) => (
            <ProductCard
              key={index}
              src={item?.image}
              alt={item?.name}
              productTitle={item?.name}
              productTitleStyle="text-text-primary text-[1.1rem] text-normal dark:text-dark-text-primary"
              badgeTitle={item.price.toLocaleString("fa-IR")}
              padding="px-2"
              fontSize="text-[1.1rem]"
              id={String(id)}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div className="w-full flex flex-col justify-center items-center pt-10 ">
          <p className="text-[1.6rem] text-primary-main">
            محصول مشابه پیدا نشد!
          </p>
          <img src={noproducts} alt="no-product" className="w-1/4" />
        </div>
      );
    }
  }
};

export default RelatedProducts;
