import { UseFormRegisterReturn } from "react-hook-form";

type Item = {
  id: number;
  name: string;
};

type FormSelectField = {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: string;
  items: Item[];
  textValueDefault: string;
};

const FormSelectField = ({
  label,
  id,
  register,
  error,
  items,
  textValueDefault,
}: FormSelectField) => {
  return (
    <fieldset className="fieldset my-3">
      <label htmlFor={id} className="fieldset-legend">
        {label}
      </label>
      <select
        defaultValue=""
        className={`select w-full shadow ${error ? "input-error" : ""}`}
        {...register}
      >
        <option disabled={true} className="" value="">
          {textValueDefault}
        </option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && (
        <p className="italic text-xs text-red-500 text-center">{error}</p>
      )}
    </fieldset>
  );
};

export default FormSelectField;
