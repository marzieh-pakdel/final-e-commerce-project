import { useQuery } from "react-query";
import Button from "../../common/button/Button";
import FilterByGroup from "../../common/filterByGroup/FilterByGroup";
import Input from "../../common/input/Input";
import ShopProductCard from "../../common/productCard/shopProductCard/ShopProductCard";
import { ChangeEvent, useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { IProductCard } from "../../../types/productTypes";
import { CgSpinner } from "react-icons/cg";


const Shop: React.FC = () => {
  const fetchProducts = async () => {
    const res = await axiosClient.get(`/products/allproducts`);
    return res.data;
  };

  const fetchCategories = async () => {
    const res = await axiosClient.get(`/category/categories`);
    return res.data;
  };

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    isLoading,
    isError,
    data: products = [],
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [filteredProducts, setFilteredProducts] = useState<IProductCard[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [clear, setClear] = useState(false);

  const filterByPrice = (price: number) => {
    if (price) {
      const updatedProducts = products.filter(
        (product: { price: number }) => product.price === price
      );
      setFilteredProducts(updatedProducts);
    } else {
      setFilteredProducts(products);
    }
  };

  useEffect(() => {
    filterByPrice(price);
  }, [price]);

  const clearFilter = () => {
    setPrice(0);
    setFilteredProducts(products);
    setClear(true);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex gap-4 justify-center items-center backdrop-brightness-90">
        <h1 className="text-4xl text-primary-main">...Loading</h1>
        <CgSpinner className="text-5xl animate-spin text-primary-main" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 w-full h-full flex justify-center items-center text-5xl">
        <h1>Error: {(error as Error).message}</h1>
      </div>
    );
  }

  return (
    <main className="w-full h-full justify-center  flex ">
      <section className="w-[122rem] h-[60rem]  flex flex-row justify-start items-center mt-14 gap-24">
        <section className="flex flex-col justify-start items-center h-full bg-base-side dark:bg-dark-base-side w-[27rem]">
          <div className="w-[25rem] gap-12 text-[1.6rem] leading-10 font-normal  flex flex-col pt-5 justify-center items-center">
            <FilterByGroup
              categories={categories}
              setFilteredProducts={setFilteredProducts}
              products={products}
              isClear={clear}
              setClear={setClear}
              price={price}
            />
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="bg-white dark:bg-dark-base-menu flex text-text-primary dark:text-dark-text-primary text-[1.6rem] leading-10  font-normal w-[24rem] h-[4rem] rounded-full  justify-center items-center  py-1 mb-8">
                فیلتر قیمت
              </div>
              <Input
                inputStyle={
                  "w-80 h-16 text-[1.4rem] leading-8 font-normal text-text-secondary dark:text-dark-text-secondary rounded-xl border-gray-200 px-5 py-4 border dark:bg-grey-0"
                }
                labelStyle={"hidden"}
                placeholder="قیمت را وارد نمایید"
                id={"قیمت"}
                value={price === 0 ? "" : price}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPrice(Number(e.target.value))
                }
              />
            </div>
            <Button
              className="w-80 text-[1.6rem] leading-10 font-normal border border-gray-400 rounded-md text-center dark:text-dark-text-primary p-1"
              children={"حذف فیلتر ها"}
              onClick={clearFilter}
            />
          </div>
        </section>

        <section className=" grid grid-cols-3 gap-4 h-full w-full overflow-y-auto overflow-x-hidden">
          {filteredProducts.map((product: IProductCard) => (
            <ShopProductCard
              key={product._id}
              flexOptional="flex-col"
              heightOptional="h-[34.7rem]"
              productTitle={product.name}
              productImg={product.image}
              badgeTitle={product.price}
              brandTitle={product.category?.name}
              description={product.description}
              id={product._id}
            />
          ))}
        </section>
      </section>
    </main>
  );
};

export default Shop;
