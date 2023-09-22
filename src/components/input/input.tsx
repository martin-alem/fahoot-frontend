import { FC, useRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { InputProps } from "../../utils/types";

const Input: FC<InputProps> = ({
  id,
  type = "text",
  name,
  placeholder = "",
  label,
  handleOnChange,
  handleOnBlur,
  value = "",
  prefixIcon,
  className = "block w-full rounded-md border-0 py-3 pl-10 text-gray-900 font-semibold ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [visible, setVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setVisible((prevVisible) => {
      if (inputRef.current) {
        inputRef.current.type = prevVisible ? "password" : "text";
      }
      return !prevVisible;
    });
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className={`relative mt-2 rounded-md shadow-sm ${error ? "ring-red-500 focus:ring-red-500" : "focus:ring-primary-600"}`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{prefixIcon}</div>
        <input
          onChange={(e) => handleOnChange(e)}
          onBlur={(e) => handleOnBlur(e)}
          value={value}
          autoComplete="off"
          ref={inputRef}
          type={type}
          name={name || id}
          id={id}
          className={`${className} ${error ? "ring-red-500 focus:ring-red-500" : "focus:ring-primary-600"}`}
          placeholder={placeholder}
          aria-invalid={!!error}
        />
        {type === "password" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {visible ? (
              <EyeIcon className="h-5 w-5 text-gray-400 cursor-pointer" aria-hidden="true" onClick={handlePasswordVisibility} />
            ) : (
              <EyeSlashIcon className="h-5 w-5 text-gray-400 cursor-pointer" aria-hidden="true" onClick={handlePasswordVisibility} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
