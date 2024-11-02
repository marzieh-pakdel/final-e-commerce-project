import { useEffect, useState } from "react";
import { useFavoritesStore } from "../../../stores/favoritesStore";
import ProductCard from "../../common/productCard/ProductCard"
import productService from "../../../services/productService";

interface IFavoriteProduct {
    title: string;
    price: number;
    image: string;
    _id: string;
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

const Favorites : React.FC = () => {
    const [favoriteProducts, setFavoriteProducts] = useState<IFavoriteProduct[]>([])
    const { favoriteProductsId } = useFavoritesStore() 

    useEffect(() => {
        fetchProducts()
    },[favoriteProductsId])

    async function fetchProducts() {
        const response = await Promise.all(
            favoriteProductsId.map((favorite) => {
                return productService.getProduct(favorite)
            })
        )

        const updatedFavoriteProducts = response.map((product: IProduct) => ({
            title: product.name,
            price: product.price,
            image: product.image,
            _id: product._id
        }))

        setFavoriteProducts(updatedFavoriteProducts)
    }

    return (
        <section className="w-full h-screen grid grid-cols-4 gap-[3.2rem] py-[3.2rem] px-[2.1rem] overflow-y-auto">
            {favoriteProducts.map((favoriteProduct) => {
                return (
                    <ProductCard 
                        id={favoriteProduct._id}
                        key={favoriteProduct._id}
                        src={favoriteProduct.image}
                        productTitle={favoriteProduct.title} 
                        productTitleStyle="text-text-primary dark:text-dark-text-primary text-[1.8rem] text-normal"
                        badgeTitle={favoriteProduct.price.toString()}
                        padding="px-2.5"
                        fontSize="text-[1.2rem]"
                    />
                )
            })}
        </section>
    )
}

export default Favorites