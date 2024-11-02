import TopBox from "./topBox/TopBox";
import SpecialProducts from "./specialProducts/SpecialProducts";



const Dashboard = () => {
  return (
    <div className="px-24 w-full flex  h-screen flex-col gap-[4.8rem]">
      <TopBox></TopBox>
      <SpecialProducts  />
    </div>
  );
};

export default Dashboard;
