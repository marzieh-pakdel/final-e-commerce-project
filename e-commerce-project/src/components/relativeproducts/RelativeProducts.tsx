import { useEffect, useState } from "react";
import productService from "../../services/productService";
import ProductCard from "../common/productCard/ProductCard";

const RelativeProducts: React.FC<string> = ({ brand }) => {
  const [prouducts, setProuducts] = useState([]);
  const fetchProducts = async () => {
    const res = await productService.getAllProducts();
    setProuducts(res);
  };
  useEffect(() => {
    // if (brand) {
      fetchProducts();
    // }
  }, []);
  console.log("prouducts", prouducts);
  return (
    <>
      {prouducts.map((product,index) => (
        <ProductCard id={""} productTitle={""} badgeTitle={""} padding={"px-2"} fontSize={"text-[1.1rem]"}>

          <div key={index}>{product.category.name}</div>
      )
      )}
    </>
  );
};

export default RelativeProducts;
