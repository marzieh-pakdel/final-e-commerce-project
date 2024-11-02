import { FaStar } from "react-icons/fa";
import useThemeStore from "../../../../stores/themeStore";

interface IScoreProps {
  count: number;
}

const Score: React.FC<IScoreProps> = ({ count }) => {
  const {theme} = useThemeStore()

  return (
    <div className="flex flex-row-reverse">
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar 
        key={index} 
        color={
          theme === "light" 
            ? count > index 
              ? "black" 
              : "gray" 
            : count > index 
            ? "white" 
            : "gray"
        }
      />
      ))}
    </div>
  );
};

export default Score;
