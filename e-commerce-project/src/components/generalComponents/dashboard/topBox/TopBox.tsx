import ProductCard from "../../../common/productCard/ProductCard"
import Slider from "./slider/Slider"
import productService from "../../../../services/productService"
import { useEffect, useState } from "react"

interface category {
  _id: string;
  name: string;
  __v: number;
};

interface INewProduct {
  id: string,
  src: string,
  productTitle: string,
  productPrice: number,
  productDescription: string,
  category: category,
  rating: number,
  numReviews: number,
  countInStock: number,
  quantity: number,
  updatedAt: string;
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


interface IProduct {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  category: category;
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

const TopBox : React.FC = () => {
  const [newProducts, setNewProducts] = useState<INewProduct[]>([])

  useEffect(() => {
    fetchProducts()
  },[])

  async function fetchProducts() {
    const response = await productService.getAllProducts()
    const lastFourNewProducts = response.splice(-4)
    const UpdatedNewProducts = lastFourNewProducts.map((product : IProduct) : INewProduct => ({
      id: product._id,
      src: product.image,
      productTitle: product.name,
      productPrice: product.price,
      productDescription: product.description,
      category: product.category,
      rating: product.rating,
      numReviews: product.numReviews,
      countInStock: product.countInStock,
      quantity: product.quantity,
      updatedAt: product.updatedAt,
    }))
    setNewProducts(UpdatedNewProducts)
  }

  return (
    <div className="flex gap-[10rem] py-[1.7rem]">
      <div className="w-[45%] grid grid-cols-2 grid-rows-2 gap-[3.2rem]">
          {newProducts.map((product) => {
              return (
                  <ProductCard 
                    id={product.id}
                    key={product.id}
                    src={product.src}
                    alt={product.productTitle}
                    productTitle={product.productTitle} 
                    productTitleStyle="text-text-primary text-[1.1rem] text-normal dark:text-dark-text-primary"
                    badgeTitle={`${product.productPrice.toLocaleString('fa-IR')} تومان`}
                    padding="px-2"
                    fontSize="text-[1.1rem]"
                  />
              )
          })}
      </div>
      <Slider items={newProducts} />
    </div>
  )
}

export default TopBox