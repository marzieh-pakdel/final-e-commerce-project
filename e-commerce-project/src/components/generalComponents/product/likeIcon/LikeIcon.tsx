import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

interface ILikceIcon {
  handleLikeIcon: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
  isLiked: boolean;
}

const LikeIcon: React.FC<ILikceIcon> = ({ handleLikeIcon, isLiked }) => {
  return (
    <>
      {!isLiked ? (
        <FaRegHeart
          onClick={handleLikeIcon}
          className="absolute left-[7.6rem] top-[10.3rem] text-4xl cursor-pointer dark:text-dark-icon-secondary"
        />
      ) : (
        <FaHeart
          fill={`#DB2777`}
          onClick={handleLikeIcon}
          className="absolute left-[7.6rem] top-[10.3rem] text-4xl cursor-pointer"
        />
      )}
    </>
  );
};

export default LikeIcon;
