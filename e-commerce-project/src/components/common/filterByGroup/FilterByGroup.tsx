import { useEffect, useState } from "react";
import Checkbox from "../checkbox/Checkbox";
import { IFilterByGroup, IProductCard } from "../../../types/productTypes";

const FilterByGroup: React.FC<IFilterByGroup> = ({
  categories,
  setFilteredProducts,
  products,
  isClear,
  setClear,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  function toggleCategorySelection(categoryId: string): void {
    setClear?.(false);
    if (isClear) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(categoryId)
          ? prev.filter((cat) => cat !== categoryId)
          : [...prev, categoryId]
      );
    }
  }

  useEffect(() => {
    if (selectedCategories.length !== 0) {
      const filteredProducts: IProductCard[] = products.filter((product) =>
        product.category?._id &&  selectedCategories.includes(product.category._id)
      );
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategories, products]);

 return (
    <div className="flex flex-col items-start h-96">
      <div className="bg-white dark:bg-dark-base-menu text-black dark:text-dark-text-primary w-[24rem] h-[4rem] rounded-full flex justify-center items-center px-[5.2rem] py-1 mb-8">
        فیلتر دسته بندی
      </div>
      <div className=" h-3/4 overflow-y-auto  w-full">
        {categories.map((category, index) => (
          <Checkbox
            key={index}
            label={category.name}
            checked={
              isClear ? !isClear : selectedCategories.includes(category._id)
            }
            onChange={() => toggleCategorySelection(category._id)}
            labelStyle="dark:text-dark-text-primary"
            containerStyle="flex flex-row-reverse justify-end gap-2 my-3 mx-8"
          />
        ))}
      </div>
    </div>
  );
};
export default FilterByGroup;
