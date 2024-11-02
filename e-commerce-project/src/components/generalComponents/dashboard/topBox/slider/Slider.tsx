import { useState } from "react";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { FaStar, FaShoppingCart, FaClock, FaBox } from "react-icons/fa";
import { AiFillShop } from "react-icons/ai";
import { Link } from "react-router-dom";

interface category {
    _id: string;
    name: string;
    __v: number;
  };

interface IItem {
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

interface ISliderProps {
    items : IItem[]
}

const Slider : React.FC<ISliderProps> = ( {items} ) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        const newIndex = currentIndex !== 0 ? currentIndex - 1 : items.length - 1;
        setCurrentIndex(newIndex) 
    }

    const nextSlide = () => {
        const newIndex = currentIndex === items.length -1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex) 
    }

  return (
    <div className="relative w-[55%]">
        <IoIosArrowDroprightCircle onClick={prevSlide} className="absolute text-3xl top-[50%] transform -translate-y-1/2 -right-10 cursor-pointer dark:text-dark-text-primary" />
        {items.map((item, index) => {
            return (
                <Link
                    to={`/product/${item.id}`} 
                    key={item.id}    
                    className={`
                        ${currentIndex === index ? "flex" : "hidden"} 
                        flex-col gap-[1.6rem]`}
                >
                    <img src={item.src} alt={item.productTitle} className="aspect-video rounded-[0.8rem] object-cover" />
                    <div className="w-full flex gap-[3.2rem]">
                        <div className="flex flex-col w-[45%] text-[1.2rem] text-text-primary dark:text-dark-text-primary">
                            <h4>{item.productTitle}</h4>
                            <span className="self-end">
                                {`${item.productPrice.toLocaleString('fa-IR')} تومان`}
                            </span>
                            <p className="line-clamp-4 pt-[2.4rem]">{item.productDescription}</p>
                        </div>
                        <div className="w-[55%] grid grid-flow-col grid-cols-auto grid-rows-3 gap-y-16 items-start dark:text-dark-text-primary">
                            <div className="flex gap-[0.8rem] items-center" >
                                <FaStar className="text-[1.2rem]" />
                                <p className="text-[1.2rem] text-text-secondary dark:text-dark-text-secondary font-normal" >
                                    امتیاز : 
                                    <span className="text-text-primary dark:text-dark-text-primary">{" " + item.rating}</span>
                                </p>
                            </div>
                            <div className="flex gap-[0.8rem] items-center" >
                                <FaShoppingCart className="text-[1.2rem]" />
                                <p className="text-[1.2rem] text-text-secondary dark:text-dark-text-secondary font-normal" >
                                    تعداد : 
                                    <span className="text-text-primary dark:text-dark-text-primary" >{" " + item.quantity}</span>
                                </p>
                            </div>
                            <div className="flex gap-[0.8rem] items-center" >
                                <FaBox className="text-[1.2rem]" />
                                <p className="text-[1.2rem] text-text-secondary dark:text-dark-text-secondary font-normal" >
                                    موجودی : 
                                    <span className="text-text-primary dark:text-dark-text-primary">{" " + item.countInStock}</span>
                                </p>
                            </div>
                            <div className="flex gap-[0.8rem] items-center" >
                                <AiFillShop className="text-[1.2rem]" />
                                <p className="text-[1.2rem] text-text-secondary dark:text-dark-text-secondary font-normal" >
                                    برند : 
                                    <span className="text-text-primary dark:text-dark-text-primary">{" " + item.category.name}</span>
                                </p>
                            </div>
                            <div className="flex gap-[0.8rem] items-center" >
                                <FaClock className="text-[1.2rem]" />
                                <p className="text-[1.2rem] text-text-secondary dark:text-dark-text-secondary font-normal" >
                                    زمان بروزرسانی : 
                                    <span className="text-text-primary dark:text-dark-text-primary">{" " + new Date(item.updatedAt).toLocaleDateString('fa-IR')}</span>
                                </p>
                            </div>
                            <div className="flex gap-[0.8rem] items-center" >
                                <FaStar className="text-[1.2rem]" />
                                <p className="text-[1.2rem] text-text-secondary dark:text-dark-text-secondary font-normal" >
                                    نظرات :  
                                    <span className="text-text-primary dark:text-dark-text-primary">{" " + item.numReviews}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })}
        <IoIosArrowDropleftCircle onClick={nextSlide} className="absolute text-3xl top-[50%] transform -translate-y-1/2 -left-10 cursor-pointer dark:text-dark-text-primary" />
    </div>
  )
}

export default Slider