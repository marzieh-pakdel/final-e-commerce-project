import { useEffect, useState } from "react"
import AdminProductCard from './adminProductCard/AdminProductCard'
import productService from "../../../services/productService"
import mockPhoto from "../../../assets/images/mockImage.png"

interface IProduct {
    id: string;
    image: string;
    name: string;
    price: number;
    category: string;
    description: string;
    updatedDate: string,
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

interface IProductResponse {
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

function formatDate(date : Date) {
    return new Intl.DateTimeFormat(
      'fa-IR',
      { day: 'numeric', month: 'long', year: 'numeric' }
    ).format(date);
  }

const AllProducts: React.FC = () => {
    const [allProducts, setAllProducts] = useState<IProduct[]>([])

    useEffect(() => {
        fetchAllProducts()
    },[])

    async function fetchAllProducts() {
        const response = await productService.getAllProducts()
        const updatedAllProducts = response.map((product: IProductResponse) : IProduct => ({
                id: product._id,
                image: mockPhoto, //product.image
                name: product.name,
                price: product.price,
                category: product.category.name,
                description: product.description,
                updatedDate: product.updatedAt,
        }))
        setAllProducts(updatedAllProducts)
    }

  return (
    <div className="m-40 mx-52 grid grid-cols-2 gap-[3.2rem] rounded">
        {allProducts.map((product : IProduct) => (
            <AdminProductCard
                id= {product.id}
                key={product.id}
                name= {product.name}
                image= {product.image}
                price= {product.price.toLocaleString('fa-IR')}
                category= {product.category}
                description= {product.description}
                updatedDate={formatDate(new Date(product.updatedDate))}
            />
        ))}
    </div>
  )
}

export default AllProducts