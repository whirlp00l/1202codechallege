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

  return (
    <div className="min-w-full">
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
        onChange={onChange}
        value={value}
      ></input>
      {error && (
        <p className="text-red-500 text-xs italic pt-1 break-normal">{error}</p>
      )}
    </div>
  );
};
