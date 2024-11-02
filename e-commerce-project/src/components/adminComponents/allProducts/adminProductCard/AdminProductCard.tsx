import { Link } from "react-router-dom";
import Button from "../../../common/button/Button";
import { FaArrowLeftLong } from "react-icons/fa6";

interface IProductCardProps {
    id: string;
    image: string;
    name: string;
    price: string;
    category: string;
    description: string;
    updatedDate: string;
  }

const AdminProductCard: React.FC<IProductCardProps> = ({id, image, name, price, description, updatedDate}) => {
  return (
    <div className="flex bg-base-card dark:bg-dark-base-card p-[0.8rem] rounded-[0.8rem]">
      <img 
        src={image} 
        alt={name}
        className="w-[16rem] h-[16rem] object-cover"
      />
      <div className="p-[1.6rem] w-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h2 className="text-[1.6rem] font-medium text-primary dark:text-dark-text-primary">{name}</h2>
          <span className="text-text-secondary dark:text-dark-text-secondary text-[1.2rem]">{updatedDate}</span>
        </div>
        <div className="line-clamp-2 text-text-secondary dark:text-dark-text-secondary text-[1.4rem]">{description}</div>
        <div className="flex justify-between items-center">
          <Link to={`/product/${id}`}>
            <Button 
              className="flex items-center gap-3 bg-primary-main hover:bg-primary-dark transition-colors ease-linear py-[0.8rem] px-[1.2rem] rounded-[0.8rem] text-text-button text-[1.4rem]"
            >
              مشاهده بیشتر
              <FaArrowLeftLong className="text-text-button" />
            </Button>
          </Link>
          <span className="text-primary dark:text-dark-text-primary text-[1.6rem]">{`${price} تومان`}</span>
        </div>
      </div>
    </div>
  )
}

export default AdminProductCard