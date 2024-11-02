interface ICheckboxProps {
  label: string;
  inputStyle?: string;
  labelStyle?: string;
  containerStyle?: string;
  checked?: boolean;
  onChange?: () => void;
}

const Checkbox: React.FC<ICheckboxProps> = ({
  inputStyle,
  labelStyle,
  containerStyle,
  label,
  checked = false,
  onChange,
}) => {
  // this code input before edit by me:

  //   const [isChecked, setIsChecked] = useState(checked);

  //   const CheckboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setIsChecked(event.target.checked);
  //     if (onChange) {
  //      onChange(event.target.checked);
  //   }
  // };
  return (
    <div className={containerStyle}>
      <label htmlFor={label} className={labelStyle}>
        {label}
      </label>
      <input
        className={inputStyle}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default Checkbox;
