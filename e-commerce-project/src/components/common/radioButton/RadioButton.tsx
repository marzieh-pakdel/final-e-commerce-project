import { useState } from "react";


interface IRadioButtonProps {
  name: string;
  options: {value: string; label: string} [];
  checked?: string;
  onChange?: (value: string) => void;
  // componentStyle?:string;
  // containerStyle?: string;
  // labelStyle?: string;
  // radioStyle?: string;
}

const RadioButton: React.FC<IRadioButtonProps> = ({
  name,
  options,
  // radioStyle,
  // labelStyle,
  // containerStyle,
  // componentStyle,
  checked = '',
  onChange,
}) => {

  const [selectedOption, setSelectedOption] = useState(checked);

  const handleChange = (value: string) => {
    setSelectedOption(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex w-full flex-col">
      {options.map((option) => (
        <div className="flex w-full gap-2 items-center" key = {option.value}>
          <input
            className="accent-[#DB2777]"
            type = 'radio'
            id= {option.value}
            name= {name}
            value = {option.value}
            checked = {selectedOption === option.value}
            onChange = {() => handleChange(option.value)} 
          />
          <label className="text-text-primary dark:text-dark-text-primary text-[1.6rem]" htmlFor = {option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
}

export default RadioButton;