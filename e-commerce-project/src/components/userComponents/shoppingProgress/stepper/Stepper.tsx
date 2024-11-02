import Button from "../../../common/button/Button"
import { IoCheckbox } from "react-icons/io5";
import { useStepperStore } from "../../../../stores/shoppingProgressStore";

const Stepper = () => {
    const {step, setStep} = useStepperStore();
  return (
    <div className="mb-20 pt-20 px-5 w-[70rem] mx-auto flex flex-row-reverse justify-center items-center gap-[1.6rem]">
        <Button className="flex flex-col gap-4 items-center p-4">
            <p className={`text-[1.6rem]
                    ${step >= 1 ? "text-success-main" : "text-text-primary dark:text-dark-text-primary"}
            `}>ورود</p>
            <IoCheckbox className={`text-[1.8rem] fill-success-main ${step >= 1 ? "block" : "hidden"}`} />
        </Button>
        <div className={`border w-full ${step >= 1 ? "border-success-main" : "border-text-primary"}`}></div>
        <Button onClick={() => {setStep(2)}} className="flex flex-col gap-4 items-center p-4">
           <p className={`text-[1.6rem]
                ${step >= 2 ? "text-success-main" : "text-text-primary dark:text-dark-text-primary"}
            `}>آدرس</p>
           <IoCheckbox className={`text-[1.8rem] fill-success-main ${step >= 2 ? "block" : "hidden"}`} />
        </Button>
        <div className={`border w-full ${step >= 2 ? "border-success-main" : "border-text-primary"}`}></div>
        <Button onClick={() => {setStep(3)}} className="flex flex-col gap-4 items-center p-4">
            <p className={`text-[1.6rem] text-nowrap
                    ${step === 3 ? "text-success-main" : "text-text-primary dark:text-dark-text-primary"}
            `}>خلاصه خرید</p>
           <IoCheckbox className={`text-[1.8rem] fill-success-main ${step === 3 ? "block" : "hidden"}`} />
        </Button>
    </div>
  )
}

export default Stepper