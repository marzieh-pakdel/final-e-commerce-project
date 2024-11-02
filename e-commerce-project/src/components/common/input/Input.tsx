import { forwardRef, ChangeEventHandler, FocusEventHandler } from "react";

interface IInputProps {
  inputStyle: string;
  labelStyle: string;
  type?: string;
  placeholder?: string;
  label?: string | JSX.Element;
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  value?: string | number;
}
const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      inputStyle,
      labelStyle,
      type = "text",
      placeholder,
      label,
      id,
      value,
      onChange,
      onBlur,
      onFocus,
      name,
    },
    ref
  ) => {
    return (
      <>
        <label 
          htmlFor={id} 
          className={`${labelStyle} dark:text-dark-text-primary`}
        >
          {label}
        </label>
        <input
          className={`${inputStyle} outline-none border border-base-text-field-stroke focus:border-secondary-main dark:bg-dark-base-text-field dark:text-dark-text-secondary dark:border-dark-base-text-field-stroke dark:focus:border-secondary-main`}
          type={type}
          placeholder={placeholder}
          id={id}
          value={value}
          ref={ref}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
        />
      </>
    );
  }
);

export default Input;
