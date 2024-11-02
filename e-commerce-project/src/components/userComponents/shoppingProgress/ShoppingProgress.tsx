import ShoppingSummary from "./shoppingSummary/ShoppingSummary";
import UserAddress from "./userAddress/UserAddress";
import Stepper from "./stepper/Stepper";
import { useStepperStore } from "../../../stores/shoppingProgressStore";

const ShoppingProgress = () => {
  const {step} = useStepperStore()

  return (
    <div className="w-fit mx-auto">
      <Stepper />
      {step === 2 && <UserAddress />}
      {step === 3 && <ShoppingSummary />}
    </div>
  )
}

export default ShoppingProgress