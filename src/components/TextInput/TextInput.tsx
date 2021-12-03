import { useCallback } from "react";
import debounce from "lodash.debounce";

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  validator: (value: string) => string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
export const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  placeholder = "",
  validator,
  onChange,
}) => {
  const error = validator(value);
  const debouncedChangeHandler = useCallback(debounce(onChange, 500), []);

  return (
    <div className="">
      {label && (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type="text"
        placeholder={placeholder}
        onChange={debouncedChangeHandler}
      ></input>
      {error && <p className="text-red-500 text-xs italic pt-1">{error}</p>}
    </div>
  );
};
