import Button from "../../../common/button/Button";
import ProductCard from "../../../common/productCard/ProductCard";
import { NavLink } from "react-router-dom";
import productService from "../../../../services/productService";
import { IProductCard } from "../../../../types/productTypes";
import { useQuery } from "react-query";

interface ISpecialProduct {
  id: string;
  rating: number;
  productImg: string;
  productTitle: string;
  productPrice: string;
}

const SpecialProducts = () => {
  const getAllProducts = async () => {
    const res = await productService.getAllProducts();
    return res;
  };
  const { data: allProduct = [] } = useQuery({
    queryKey: ["allProduct"],
    queryFn: getAllProducts,
  });

  const specialProduct:ISpecialProduct[] = allProduct
    .map((Product: IProductCard) => ({
      id: Product._id,
      rating: Product.rating,
      productImg: Product.image,
      productTitle: Product.name,
      productPrice: Product.price.toLocaleString('fa-IR'),
    }))
    .sort((a:ISpecialProduct, b:ISpecialProduct) => b.rating - a.rating);
  return (
    <div className="flex flex-col gap-y-24">
      <div className="flex justify-between items-center h-28">
        <p className="font-normal text-[4rem] text-text-primary dark:text-dark-text-primary">
          محصولات ویژه
        </p>
        <NavLink to="/shop">
          <Button
            children="فروشگاه"
            className="w-[13.5rem] h-20 rounded-full justify-center bg-primary-main font-bold text-[2rem] text-text-button"
          />
        </NavLink>
      </div>
      <div className="grid grid-cols-4 h-full gap-12 mb-24 w-full">
        {specialProduct.map(
          (Product, index) =>
            index <= 7 && (
              <ProductCard
                id={Product.id}
                key={index}
                productTitleStyle="text-text-primary text-[1.1rem] text-normal dark:text-dark-text-primary"
                padding="px-2"
                fontSize="text-[1.1rem]"
                badgeTitle={Product.productPrice + " تومان"}
                src={Product.productImg}
                alt={Product.productTitle}
                productTitle={Product.productTitle}
              />
            )
        )}
      </div>
    </div>
  );
};

export default SpecialProducts;
