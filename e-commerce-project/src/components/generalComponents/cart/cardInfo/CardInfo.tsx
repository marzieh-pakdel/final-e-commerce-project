import { MdDeleteForever } from "react-icons/md";
import CartStore from "../../../../stores/cartStore";

interface ICartInfoProps {
  img: string;
  productName: string;
  productCategory: string;
  productPrice: number;
  optionCount: number;
  productId: string;
}

const CardInfo: React.FC<ICartInfoProps> = ({
  img,
  productName,
  productCategory,
  productPrice,
  optionCount,
  productId,
}) => {
  const { removeItem, cartItems } = CartStore()

  const removeHandler = () => {
    removeItem(productId)
  }

const item = cartItems.find((item) => item._id === productId)

const countHandler = (count: number) => {
  if (item) {
    item.qty = count;
  }
}

  return (
    <div className="flex justify-between items-center w-full h-[30%]">
      <div className="flex-2 h-full">
        <img src={img} alt="picture" className="w-full h-full rounded-lg aspect-square" />
      </div>
      <div className="flex-1  h-full font-Iran-Yekan flex flex-col justify-between pr-10">
        <p className="font-normal text[1.6rem] text-primary-main text-right">
          {productName}
        </p>
        <p className="font-normal text-[1.6rem] text-right text-text-primary dark:text-dark-text-primary">
          {productCategory}
        </p>
        <p className="text-text-primary text-right text-[1.6rem] font-bold dark:text-dark-text-primary">
          {productPrice.toLocaleString('fa-IR')}
        </p>
      </div>
      <div className="flex-2  flex gap-[1.6rem] pl-3 justify-center items-center h-full">
        <select 
          className="w-[7rem] h-[3rem] transition-transform border dark:bg-dark-base-text-field border-base-text-field-stroke dark:border-dark-base-text-field-stroke dark:text-dark-icon-primary rounded-lg"
          onChange={(e) => {countHandler(Number(e.target.value))}}
          defaultValue={item?.qty}
        >
          {[...Array(optionCount).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
        <MdDeleteForever 
          className="w-[2rem] h-[2rem] text-error-main cursor-pointer" 
          onClick={removeHandler}
        />
      </div>
    </div>
  );
};

export default CardInfo;
